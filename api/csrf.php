<?php
/**
 * Emite CSRF para o endpoint /api/lead.php (sem IDs de recurso).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

session_start([
    'cookie_httponly' => true,
    'cookie_secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true,
]);

if (empty($_SESSION['es_csrf'])) {
    $_SESSION['es_csrf'] = bin2hex(random_bytes(32));
}

echo json_encode(['ok' => true, 'csrf' => $_SESSION['es_csrf']], JSON_UNESCAPED_UNICODE);
