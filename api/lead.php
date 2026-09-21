<?php
/**
 * Endpoint opcional de lead (quando formEndpoint apontar para /api/lead.php).
 * Proteções: método, Origin/Referer, honeypot, CSRF token de sessão, rate limit por IP, sem IDs enumeráveis.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function es_json(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    es_json(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
$allowedHosts = ['eletrosilvaservicos.com', 'www.eletrosilvaservicos.com'];
$referer = $_SERVER['HTTP_REFERER'] ?? '';

$originHost = $origin !== '' ? (parse_url($origin, PHP_URL_HOST) ?: '') : '';
$refererHost = $referer !== '' ? (parse_url($referer, PHP_URL_HOST) ?: '') : '';

if ($originHost !== '' && !in_array($originHost, $allowedHosts, true)) {
    es_json(403, ['ok' => false, 'error' => 'origin_blocked']);
}
if ($originHost === '' && $refererHost !== '' && !in_array($refererHost, $allowedHosts, true)) {
    es_json(403, ['ok' => false, 'error' => 'referer_blocked']);
}

// Anti-IDOR: este endpoint não aceita id/user_id/resource_id externos
$raw = file_get_contents('php://input') ?: '';
if (strlen($raw) > 8192) {
    es_json(413, ['ok' => false, 'error' => 'payload_too_large']);
}

$data = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        es_json(400, ['ok' => false, 'error' => 'invalid_json']);
    }
    $data = $decoded;
} else {
    $data = $_POST;
}

foreach (['id', 'user_id', 'userId', 'account_id', 'order_id', 'resource', 'path'] as $forbidden) {
    if (array_key_exists($forbidden, $data)) {
        es_json(400, ['ok' => false, 'error' => 'forbidden_field']);
    }
}

// Honeypot (bots)
if (!empty($data['website']) || !empty($data['hp']) || !empty($data['company_url'])) {
    es_json(204, ['ok' => true]);
}

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
        'cookie_samesite' => 'Lax',
        'use_strict_mode' => true,
    ]);
}

$token = (string)($data['csrf'] ?? '');
$sessionToken = (string)($_SESSION['es_csrf'] ?? '');
if ($sessionToken === '' || $token === '' || !hash_equals($sessionToken, $token)) {
    es_json(403, ['ok' => false, 'error' => 'csrf']);
}

// Rate limit por IP: 5 POSTs / 10 minutos
$ip = $_SERVER['HTTP_CF_CONNECTING_IP']
    ?? $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '0.0.0.0';
if (str_contains((string)$ip, ',')) {
    $ip = trim(explode(',', (string)$ip)[0]);
}
$ip = preg_replace('/[^0-9a-fA-F:\.]/', '', (string)$ip) ?: '0.0.0.0';

$rateDir = sys_get_temp_dir() . '/eletrosilva_rl';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/rl_' . hash('sha256', $ip) . '.json';
$now = time();
$window = 600;
$maxHits = 5;
$hits = [];
if (is_file($rateFile)) {
    $prev = json_decode((string)@file_get_contents($rateFile), true);
    if (is_array($prev)) {
        $hits = array_values(array_filter($prev, static fn($t) => is_int($t) && ($now - $t) < $window));
    }
}
if (count($hits) >= $maxHits) {
    header('Retry-After: ' . $window);
    es_json(429, ['ok' => false, 'error' => 'rate_limited']);
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);

// Aceita só campos de lead — sem lookup por ID
$name = trim(strip_tags((string)($data['name'] ?? '')));
$phone = preg_replace('/\D+/', '', (string)($data['phone'] ?? '')) ?: '';
$service = trim(strip_tags((string)($data['service'] ?? '')));
$neighborhood = trim(strip_tags((string)($data['neighborhood'] ?? '')));
$message = trim(strip_tags((string)($data['message'] ?? '')));

if ($phone === '' || strlen($phone) < 10 || strlen($phone) > 13) {
    es_json(422, ['ok' => false, 'error' => 'invalid_phone']);
}
if (strlen($name) > 120 || strlen($service) > 120 || strlen($neighborhood) > 120 || strlen($message) > 2000) {
    es_json(422, ['ok' => false, 'error' => 'field_too_long']);
}

// Sem persistência de objeto endereçável (anti-IDOR): só ack opaco
$receipt = bin2hex(random_bytes(16));

es_json(202, [
    'ok' => true,
    'receipt' => $receipt,
    'message' => 'Lead recebido. Preferência operacional: WhatsApp.',
]);
