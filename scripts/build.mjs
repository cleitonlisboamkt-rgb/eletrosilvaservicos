/**
 * Gera as páginas estáticas do site ELETROSILVA.
 * Executar: node scripts/build.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://eletrosilvaservicos.com";
const ASSET_V = "20260922";
const PHONE_DISPLAY = "(21) 96655-4750";
const PHONE_TEL = "5521966554750";
const LOGO_ALT = "ELETROSILVA - Serviços elétricos e manutenção";
const GTM_ID = "GTM-MVVCDT7N";

function gtmHead() {
  return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;
}

function gtmBody() {
  return `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
}

function logoMark(variant = "header") {
  const extras = variant === "footer" ? " logo--footer" : "";
  return `<span class="logo-lockup${extras}">
      <img class="logo-icon" src="img/logo-icon.png?v=${ASSET_V}" width="56" height="50" alt="" decoding="async" aria-hidden="true">
      <span class="logo-text">
        <span class="logo-name">ELETRO<span class="logo-name-tail">SILVA</span></span>
        <span class="logo-sub">Serviços elétricos &amp; manutenção</span>
      </span>
    </span>`;
}

const SERVICES = [
  {
    slug: "reforma-pc-eletrico-rio-de-janeiro",
    track: "reforma-pc-eletrico",
    name: "Reforma de PC elétrico",
    short: "Reforma de PC elétrico",
    title: "Reforma de PC Elétrico no RJ | ELETROSILVA",
    description:
      "Reforma de quadro e painel de comando no Rio de Janeiro, com balanceamento de cargas, identificação e ART. Orçamento em até 24h.",
    h1: "Reforma de PC elétrico no Rio de Janeiro",
    benefit:
      "Quadro antigo, superaquecendo ou fora de norma? Reforma com balanceamento de cargas e identificação de circuitos.",
    wa: "Olá! Vim pelo site e preciso de orçamento para reforma de PC elétrico no Rio de Janeiro.",
    icon: "panel",
  },
  {
    slug: "automacao-industrial-predial-residencial-rio-de-janeiro",
    track: "automacao",
    name: "Automação industrial, predial e residencial",
    short: "Automação industrial, predial e residencial",
    title: "Automação Elétrica no RJ | ELETROSILVA",
    description:
      "Automação industrial, predial e residencial no Rio de Janeiro: CLP, supervisório, iluminação e controle. Equipe própria e ART.",
    h1: "Automação industrial, predial e residencial no Rio de Janeiro",
    benefit: "Controle de cargas, iluminação e processos com projeto, CLP e comissionamento. Sem improviso de aplicativo genérico.",
    wa: "Olá! Vim pelo site e preciso de orçamento para automação elétrica no Rio de Janeiro.",
    icon: "auto",
  },
  {
    slug: "instalacao-eletrica-predial-rio-de-janeiro",
    track: "instalacao-predial",
    name: "Instalação elétrica predial",
    short: "Instalação elétrica predial",
    title: "Instalação Elétrica Predial no RJ | ELETROSILVA",
    description:
      "Eletricista predial no Rio de Janeiro para condomínios e edifícios: prumadas, quadros, NR-10, laudo e ART. Orçamento em até 24h.",
    h1: "Instalação elétrica predial no Rio de Janeiro",
    benefit: "Prumadas, quadros de distribuição e áreas comuns com documentação para síndico e administradora.",
    wa: "Olá! Vim pelo site e preciso de orçamento para instalação elétrica predial no Rio de Janeiro.",
    icon: "building",
  },
  {
    slug: "instalacao-eletrica-residencial-rio-de-janeiro",
    track: "instalacao-residencial",
    name: "Instalação elétrica residencial",
    short: "Instalação elétrica residencial",
    title: "Instalação Elétrica Residencial no RJ | ELETROSILVA",
    description:
      "Instalação elétrica residencial no Rio de Janeiro: obra nova, reforma e adequação à NBR 5410. Equipe própria e ART.",
    h1: "Instalação elétrica residencial no Rio de Janeiro",
    benefit: "Circuitos dimensionados, DR onde a norma exige e quadro organizado, prontos para uso seguro.",
    wa: "Olá! Vim pelo site e preciso de orçamento para instalação elétrica residencial no Rio de Janeiro.",
    icon: "home",
  },
  {
    slug: "instalacao-eletrica-industrial-rio-de-janeiro",
    track: "instalacao-industrial",
    name: "Instalação elétrica industrial",
    short: "Instalação elétrica industrial",
    title: "Instalação Elétrica Industrial no RJ | ELETROSILVA",
    description:
      "Instalação elétrica industrial no Rio de Janeiro: painéis, barramentos, motores e emergência para linha de produção.",
    h1: "Instalação elétrica industrial no Rio de Janeiro",
    benefit: "Infraestrutura para carga de máquina, com janela de parada combinada e equipe de urgência.",
    wa: "Olá! Vim pelo site e preciso de orçamento para instalação elétrica industrial no Rio de Janeiro.",
    icon: "factory",
  },
  {
    slug: "sistemas-inteligentes-rio-de-janeiro",
    track: "sistemas-inteligentes",
    name: "Sistemas inteligentes",
    short: "Sistemas inteligentes",
    title: "Sistemas Inteligentes no RJ | ELETROSILVA",
    description:
      "Casa e prédio automatizados no Rio de Janeiro: iluminação, HVAC, acesso e cenas. Integração com a instalação elétrica existente.",
    h1: "Sistemas inteligentes para casa e prédio no Rio de Janeiro",
    benefit: "Automação sobre a elétrica existente: cenas, medição e controle sem demolir a casa inteira.",
    wa: "Olá! Vim pelo site e preciso de orçamento para sistemas inteligentes no Rio de Janeiro.",
    icon: "chip",
  },
  {
    slug: "instalacao-de-motores-eletricos-rio-de-janeiro",
    track: "instalacao-motores",
    name: "Instalação de motores elétricos",
    short: "Instalação de motores elétricos",
    title: "Instalação de Motores Elétricos RJ | ELETROSILVA",
    description:
      "Instalação de motores elétricos no Rio de Janeiro: alinhamento, partida, proteção e NR-12. Atendimento industrial na capital.",
    h1: "Instalação de motores elétricos no Rio de Janeiro",
    benefit: "Partida, proteção e alinhamento corretos. Motor novo não queima por erro de instalação.",
    wa: "Olá! Vim pelo site e preciso de orçamento para instalação de motores elétricos no Rio de Janeiro.",
    icon: "motor",
  },
  {
    slug: "manutencao-de-motores-eletricos-rio-de-janeiro",
    track: "manutencao-motores",
    name: "Manutenção de motores elétricos",
    short: "Manutenção de motores elétricos",
    title: "Manutenção de Motores Elétricos RJ | ELETROSILVA",
    description:
      "Manutenção de motores elétricos no RJ: diagnóstico, rebobinamento e urgência para linha parada no município do Rio.",
    h1: "Manutenção de motores elétricos no Rio de Janeiro",
    benefit: "Diagnóstico, rebobinamento e balanceamento, com atendimento de urgência para linha parada.",
    wa: "Olá! Vim pelo site e preciso de orçamento para manutenção de motores elétricos no Rio de Janeiro.",
    icon: "wrench",
  },
  {
    slug: "instalacao-de-padrao-eletrico-rio-de-janeiro",
    track: "padrao-eletrico",
    name: "Instalação de padrão elétrico",
    short: "Instalação de padrão elétrico",
    title: "Padrão Elétrico Light no RJ | ELETROSILVA",
    description:
      "Padrão de entrada Light no Rio de Janeiro: projeto, montagem e acompanhamento até a ligação da concessionária.",
    h1: "Instalação de padrão elétrico Light no Rio de Janeiro",
    benefit: "Padrão novo aprovado pela concessionária, do projeto à ligação.",
    wa: "Olá! Vim pelo site e preciso de orçamento para instalação de padrão elétrico Light no Rio de Janeiro.",
    icon: "meter",
  },
  {
    slug: "montagem-de-painel-eletrico-rio-de-janeiro",
    track: "montagem-painel",
    name: "Montagem de painel elétrico",
    short: "Montagem de painel elétrico",
    title: "Montagem de Painel Elétrico no RJ | ELETROSILVA",
    description:
      "Montagem de painel elétrico no RJ: CCM, comando e distribuição sob NBR IEC, com diagrama, testes e ART.",
    h1: "Montagem de painel elétrico no Rio de Janeiro",
    benefit: "Painel montado com diagrama, identificação e teste, pronto para energizar com segurança.",
    wa: "Olá! Vim pelo site e preciso de orçamento para montagem de painel elétrico no Rio de Janeiro.",
    icon: "cabinet",
  },
];

const BAIRROS = {
  "Centro e adjacências": [
    "Centro",
    "Lapa",
    "Santa Teresa",
    "Glória",
    "Catumbi",
    "Cidade Nova",
    "Santo Cristo",
    "Gamboa",
    "Saúde",
    "Caju",
  ],
  "Zona Sul": [
    "Copacabana",
    "Ipanema",
    "Leblon",
    "Botafogo",
    "Flamengo",
    "Laranjeiras",
    "Humaitá",
    "Gávea",
    "Jardim Botânico",
    "Leme",
    "Urca",
    "São Conrado",
  ],
  "Zona Norte": [
    "Tijuca",
    "Vila Isabel",
    "Maracanã",
    "Grajaú",
    "Andaraí",
    "Méier",
    "Engenho de Dentro",
    "Cachambi",
    "Todos os Santos",
    "Piedade",
    "Madureira",
    "Cascadura",
    "Penha",
    "Bonsucesso",
    "Ramos",
    "Olaria",
    "Irajá",
    "Vila da Penha",
    "Pavuna",
    "Anchieta",
  ],
  "Zona Oeste": [
    "Barra da Tijuca",
    "Recreio dos Bandeirantes",
    "Jacarepaguá",
    "Freguesia",
    "Taquara",
    "Campo Grande",
    "Santa Cruz",
    "Bangu",
    "Realengo",
    "Padre Miguel",
    "Guaratiba",
    "Vargem Grande",
  ],
  "Ilha do Governador": ["Jardim Guanabara", "Portuguesa", "Cocotá", "Bancários"],
};

const FAQ_HOME = [
  {
    q: "Quanto custa uma instalação elétrica residencial no Rio de Janeiro?",
    a: "O valor depende da metragem, do número de circuitos, do estado da infraestrutura existente e se há quadro, aterramento e DR a substituir. Não publicamos tabela fechada porque um apartamento em Copacabana com fiação antiga não se compara a uma casa nova na Barra. O caminho correto é visita técnica, levantamento de cargas e proposta com escopo. Retornamos o primeiro contato em até 24h úteis.",
  },
  {
    q: "O que é padrão elétrico e quando preciso trocar?",
    a: "O padrão de entrada é o conjunto medidor, proteção e caixa que a Light exige para ligar ou aumentar a carga. Troca-se em obra nova, aumento de demanda, padrão danificado, irregular ou fora da norma vigente da concessionária. Cuidamos do projeto, da montagem e do acompanhamento até a aprovação.",
  },
  {
    q: "Vocês atendem quais bairros do Rio?",
    a: "Atendemos exclusivamente o município do Rio de Janeiro: Centro, Zona Sul, Zona Norte, Zona Oeste e Ilha do Governador. Não atendemos Baixada Fluminense, Niterói, São Gonçalo nem a Região dos Lagos.",
  },
  {
    q: "Fazem o padrão de entrada dentro da norma da Light?",
    a: "Sim. Montamos o padrão de entrada conforme o regulamento da Light para a capital, com dimensionamento da proteção, aterramento e disposição da caixa. O objetivo é passar na vistoria sem retrabalho.",
  },
  {
    q: "Vocês emitem ART?",
    a: "Sim. Emitimos ART do responsável técnico no CREA-RJ quando o serviço exige. Também emitimos laudo e nota fiscal. Não terceirizamos a equipe de campo.",
  },
  {
    q: "Qual o prazo para montagem de painel elétrico?",
    a: "Depende da complexidade (quadro de distribuição, CCM, comando com CLP) e da disponibilidade de materiais. Após o diagrama aprovado, informamos prazo na proposta. Serviços de urgência industrial são priorizados quando a linha está parada.",
  },
  {
    q: "Atendem emergência fora do horário comercial?",
    a: "Sim, para falha que coloque risco ou pare produção/condomínio. Combinamos na triagem do chamado. Não prometemos tempo de chegada genérico.",
  },
  {
    q: "Qual a diferença entre reforma de quadro e troca de padrão?",
    a: "O quadro (PC/QGBT) distribui os circuitos internos. O padrão é a entrada da concessionária, no limite da via pública/medição. Muitas vezes os dois precisam ser tratados juntos, mas são serviços e normas diferentes.",
  },
  {
    q: "Trabalham com automação para casa já construída?",
    a: "Sim. Em imóvel pronto priorizamos soluções que aproveitam eletrodutos existentes, módulos em substituição de interruptores e quadros auxiliares. Retrofit mal planejado vira gambiarra; por isso o diagnóstico vem antes do catálogo de gadgets.",
  },
  {
    q: "Fazem manutenção preventiva de motores?",
    a: "Sim. Inspeção, medição de isolamento, verificação de rolamentos, alinhamento e plano de parada. Corretiva de urgência também, quando o motor já parou a linha.",
  },
];

function iconSvg(name) {
  const icons = {
    panel:
      '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    auto: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
    building:
      '<path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6M9 10h.01M15 10h.01M12 10h.01M9 14h.01M15 14h.01"/>',
    home: '<path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-6h4v6"/>',
    factory:
      '<path d="M3 21h18M5 21V10l6 4V10l6 4V21"/><path d="M17 8V5h2v3"/>',
    chip: '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    motor:
      '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 5v2M12 17v2M5 12h2M17 12h2"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4L15 12z"/>',
    meter:
      '<rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 9v3l2 1"/>',
    cabinet:
      '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M5 8h14M5 13h14M9 16h.01M12 16h.01M15 16h.01"/>',
    check:
      '<path d="M5 12l5 5L20 7"/>',
    phone:
      '<path d="M6 3h4l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 7a2 2 0 0 1 2-2z"/>',
    wa: '<path fill="currentColor" stroke="none" d="M19.1 4.9A9.9 9.9 0 0 0 3.2 16.3L2 22l5.8-1.2A9.9 9.9 0 1 0 19.1 4.9zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-3.5.7.7-3.4-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4.1-.3c0-.1 0-.3-.1-.4s-.5-1.3-.7-1.8c-.2-.5-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.5 3.8 3.4 1.4.6 1.9.6 2.6.5.4-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1c-.1 0-.3-.1-.5-.2z"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.panel}</svg>`;
}

function head({ title, description, path, extra = "", canonical, robots = "index,follow" }) {
  const url = `${SITE}${path}`;
  const canon = canonical || url;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
${gtmHead()}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canon}">
  <meta name="robots" content="${robots}">
  <meta name="theme-color" content="#0A2540">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="ELETROSILVA">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}/img/logo.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <link rel="icon" href="img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root{--blue:#0F4C9A;--ink:#0A2540;--cta:#E87722;--header-h:84px}
    *{box-sizing:border-box}
    body{margin:0;font-family:"Source Sans 3",system-ui,sans-serif;color:var(--ink);background:#f7f9fc}
    .header{position:sticky;top:0;z-index:80;background:#fff;border-bottom:1px solid #d5dde8}
    .header-inner{display:flex;align-items:center;gap:16px;min-height:84px}
    .wrap{width:min(calc(100% - 32px),1180px);margin-inline:auto}
    .logo{display:flex;align-items:center;text-decoration:none;color:#0A2540}
    .logo-lockup{display:flex;align-items:center;gap:12px}
    .logo-icon{height:52px;width:auto;display:block}
    .logo-name{display:block;font-family:Montserrat,sans-serif;font-weight:800;font-size:1.2rem;letter-spacing:-.03em;line-height:1;color:#0A2540}
    .logo-name-tail{color:#0A2540}
    .logo-sub{display:block;margin-top:4px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#4A5D73}
    .nav,.phone-link{display:none}
    .menu-btn{width:48px;height:48px;border:1px solid #d5dde8;background:#fff;border-radius:8px}
    .hero{position:relative;background:#0A2540;color:#fff;min-height:78vh;display:flex;align-items:center}
    .hero-overlay{position:absolute;inset:0;background:linear-gradient(105deg,rgba(10,37,64,.94),rgba(15,76,154,.55) 55%,rgba(232,119,34,.28))}
    .hero .wrap{position:relative;z-index:1;padding:48px 0 56px}
    h1{font-family:Montserrat,sans-serif;font-size:clamp(1.75rem,4vw,2.75rem);line-height:1.15;margin:0 0 12px}
    .lead{font-size:1.05rem}
    .cta-row{display:flex;flex-wrap:wrap;gap:12px}
    .btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border-radius:10px;font-weight:700;text-decoration:none;border:2px solid transparent}
    .btn--primary{background:#E87722;color:#fff}
    .btn--ghost{color:#fff;border-color:rgba(255,255,255,.55)}
    .eyebrow{font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#F9A825}
  </style>
  <link rel="stylesheet" href="css/site.css?v=${ASSET_V}">
  ${extra}
</head>`;
}

function header(active) {
  const nav = [
    ["#servicos", "Serviços", "servicos"],
    ["#setores", "Setores", "setores"],
    ["#diferenciais", "Sobre", "sobre"],
    ["#contato", "Contato", "contato"],
  ];
  const links = nav
    .map(([href, label, key]) => {
      const current = active === key ? ' aria-current="page"' : "";
      const url = active && active !== "home" && href.startsWith("#") ? `index.html${href}` : href;
      return `<a href="${url}"${current}>${label}</a>`;
    })
    .join("");
  return `
<a class="skip" href="#conteudo">Ir para o conteúdo</a>
<header class="header">
  <div class="wrap header-inner">
    <a class="logo" href="index.html" aria-label="${LOGO_ALT}">${logoMark()}</a>
    <nav class="nav" aria-label="Principal">${links}</nav>
    <div class="header-actions">
      <a class="phone-link" data-href="phone" data-fill="phoneDisplay" href="tel:+${PHONE_TEL}">${PHONE_DISPLAY}</a>
      <a class="btn btn--primary btn--sm" data-wa="Olá! Vim pelo site e quero solicitar um orçamento." href="#contato" aria-label="Orçamento no WhatsApp">Orçamento no WhatsApp</a>
      <button class="menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false">${iconSvg("panel")}</button>
    </div>
  </div>
  <div class="wrap nav-mobile" hidden>${links.replace(/<a /g, '<a ')}</div>
</header>`;
}

// Fix mobile nav - don't use hidden attribute since JS toggles is-open
function headerFixed(active) {
  const item = (href, label, key) => {
    const current = active === key ? ' aria-current="page"' : "";
    const url = active !== "home" && href.startsWith("#") ? `index.html${href}` : href;
    return `<a href="${url}"${current}>${label}</a>`;
  };
  const linksDesktop =
    item("#servicos", "Serviços", "servicos") +
    item("#obras", "Obras", "obras") +
    item("#setores", "Setores", "setores") +
    item("#contato", "Contato", "contato");
  return `
<a class="skip" href="#conteudo">Ir para o conteúdo</a>
<header class="header">
  <div class="wrap header-inner">
    <a class="logo" href="index.html" aria-label="${LOGO_ALT}">${logoMark()}</a>
    <nav class="nav" aria-label="Principal">${linksDesktop}</nav>
    <div class="header-actions">
      <a class="phone-link" data-href="phone" data-fill="phoneDisplay" href="tel:+${PHONE_TEL}">${PHONE_DISPLAY}</a>
      <a class="btn btn--primary btn--sm" data-wa="Olá! Vim pelo site e quero solicitar um orçamento." href="#contato">Orçamento no WhatsApp</a>
      <button class="menu-btn" type="button" aria-label="Abrir menu" aria-controls="menu-mobile" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
  <nav class="wrap nav-mobile" id="menu-mobile" aria-label="Menu móvel">${linksDesktop}</nav>
</header>`;
}

function footer() {
  const svcLinks = SERVICES.map(
    (s) => `<li><a href="${s.slug}.html">${s.short}</a></li>`
  ).join("");
  return `
<footer class="footer">
  <div class="wrap footer-grid">
    <div>
      <div class="logo logo--footer" style="margin-bottom:12px">${logoMark("footer")}</div>
      <p>Serviços elétricos e automação no município do Rio de Janeiro: residencial, predial e industrial.</p>
      <p>Área de cobertura: apenas a capital do Rio de Janeiro (todas as zonas e Ilha do Governador).</p>
    </div>
    <div>
      <h3>Contato</h3>
      <ul>
        <li>Tel.: <a data-href="phone" data-fill="phoneDisplay" href="tel:+${PHONE_TEL}">${PHONE_DISPLAY}</a></li>
      </ul>
    </div>
    <div>
      <h3>Serviços</h3>
      <ul>${svcLinks}</ul>
    </div>
    <div>
      <h3>Empresa</h3>
      <ul>
        <li><a href="index.html#obras">Obras</a></li>
        <li><a href="index.html#setores">Setores atendidos</a></li>
        <li><a href="index.html#area">Área de atendimento</a></li>
        <li><a href="index.html#faq">Perguntas frequentes</a></li>
        <li><a href="privacidade.html">Política de privacidade</a></li>
        <li><a href="index.html#contato">Pedir orçamento</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© ELETROSILVA · Rio de Janeiro/RJ</span>
    <span>Não atendemos fora do município do Rio de Janeiro.</span>
  </div>
</footer>
<a class="wa-float" data-wa="Olá! Vim pelo site e preciso de um orçamento." href="#contato" aria-label="Abrir conversa no WhatsApp">${iconSvg("wa")}</a>
<script src="js/config.js?v=${ASSET_V}" defer></script>
<script src="js/site.js?v=${ASSET_V}" defer></script>
`;
}

function bairroSelect() {
  return Object.entries(BAIRROS)
    .map(([zona, lista]) => {
      const opts = lista.map((b) => `<option value="${b}">${b}</option>`).join("");
      return `<optgroup label="${zona}">${opts}</optgroup>`;
    })
    .join("");
}

function serviceOptions(selected = "") {
  return SERVICES.map((s) => {
    const sel = s.name === selected ? " selected" : "";
    return `<option value="${s.name}"${sel}>${s.name}</option>`;
  }).join("");
}

const OBRAS = [
  {
    src: "img/obras/painel-industrial.webp",
    alt: "Montagem de painel elétrico industrial com bornes e proteções identificadas",
    cap: "Montagem de painel elétrico",
  },
  {
    src: "img/obras/quadro-residencial.webp",
    alt: "Quadro de distribuição residencial com circuitos identificados",
    cap: "Quadro elétrico residencial",
  },
  {
    src: "img/obras/quadro-predial.webp",
    alt: "Quadro de distribuição predial em casa de máquinas",
    cap: "Quadro elétrico predial",
  },
  {
    src: "img/obras/padrao-entrada.webp",
    alt: "Padrão de entrada da concessionária com medidor e proteção",
    cap: "Instalação de padrão elétrico",
  },
  {
    src: "img/obras/motor-industrial.webp",
    alt: "Motor elétrico industrial instalado em base metálica",
    cap: "Instalação de motores",
  },
  {
    src: "img/obras/automacao.webp",
    alt: "Painel de automação com CLP e bornes identificados",
    cap: "Automação industrial",
  },
];

function obrasCarousel() {
  const slides = OBRAS.map(
    (o, i) => `<li class="carousel-slide"${i === 0 ? ' aria-hidden="false"' : ' aria-hidden="true"'}>
      <figure>
        <img src="${o.src}" alt="${o.alt}" width="960" height="720" loading="lazy" decoding="async">
        <figcaption>${o.cap}</figcaption>
      </figure>
    </li>`
  ).join("");
  const dots = OBRAS.map(
    (o, i) =>
      `<button type="button" class="carousel-dot" aria-label="Ir para ${o.cap}" aria-current="${i === 0 ? "true" : "false"}"></button>`
  ).join("");
  return `
<div class="carousel" data-carousel>
  <div class="carousel-viewport">
    <ul class="carousel-track">${slides}</ul>
  </div>
  <button type="button" class="carousel-btn carousel-btn--prev" aria-label="Foto anterior">‹</button>
  <button type="button" class="carousel-btn carousel-btn--next" aria-label="Próxima foto">›</button>
  <div class="carousel-dots" aria-label="Fotos das obras">${dots}</div>
</div>`;
}

function ldLocal() {
  return {
    "@context": "https://schema.org",
    "@type": ["Electrician", "LocalBusiness"],
    name: "ELETROSILVA",
    url: SITE,
    telephone: `+${PHONE_TEL}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: "Rio de Janeiro" },
  };
}

function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function homePage() {
  const cards = SERVICES.map(
    (s) => `
    <article class="card reveal">
      <div class="icon-box">${iconSvg(s.icon)}</div>
      <h3>${s.short}</h3>
      <p>${s.benefit}</p>
      <a class="more" href="${s.slug}.html">Ver detalhes</a>
    </article>`
  ).join("");

  const faq = FAQ_HOME.map(
    (f, i) => `
    <div class="faq-item">
      <button type="button" aria-expanded="false" aria-controls="faq-${i}" id="faq-btn-${i}">${f.q}<span>+</span></button>
      <div class="faq-panel" id="faq-${i}" role="region" aria-labelledby="faq-btn-${i}"><p>${f.a}</p></div>
    </div>`
  ).join("");

  const ld = [
    ldLocal(),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_HOME.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Serviços ELETROSILVA",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          areaServed: { "@type": "City", name: "Rio de Janeiro" },
          url: `${SITE}/${s.slug}.html`,
          provider: { "@type": "Electrician", name: "ELETROSILVA" },
        },
      })),
    },
  ];

  return `${head({
    title: "Eletricista no Rio de Janeiro | ELETROSILVA",
    description:
      "Instalação e manutenção elétrica no Rio de Janeiro: residencial, predial e industrial. ART, NR-10 e orçamento em até 24h.",
    path: "/",
    extra: ld.map(jsonLd).join("\n"),
  })}
<body data-page="home">
${gtmBody()}
${headerFixed("home")}
<main id="conteudo">
  <section class="hero" id="inicio">
    <div class="hero-overlay"></div>
    <div class="wrap">
      <p class="eyebrow">Eletricista no município do Rio de Janeiro</p>
      <h1 data-dynamic-h1>Instalação e manutenção elétrica no Rio de Janeiro: residencial, predial e industrial</h1>
      <p class="lead">Equipe própria, ART e laudo técnico. Orçamento em até 24 horas úteis.</p>
      <div class="cta-row">
        <a class="btn btn--primary" data-wa="Olá! Vim pelo site e preciso de orçamento para serviço elétrico no Rio de Janeiro." href="#contato">Solicitar orçamento no WhatsApp</a>
        <a class="btn btn--ghost" data-href="phone" href="#contato">Ligar agora</a>
      </div>
      <div class="badges">
        <span class="badge">${iconSvg("check")} Emissão de ART</span>
        <span class="badge">${iconSvg("check")} Equipe NR-10 e NR-35</span>
        <span class="badge">${iconSvg("check")} Nota fiscal</span>
        <span class="badge">${iconSvg("check")} Garantia em serviço</span>
        <span class="badge">${iconSvg("check")} Atendimento emergencial</span>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="perfis">
    <div class="wrap">
      <p class="eyebrow">Comece pelo seu caso</p>
      <h2>Você precisa de serviço elétrico para:</h2>
      <div class="grid grid-3">
        <a class="card card--link card--profile reveal" href="#setor-residencial">
          <div class="icon-box">${iconSvg("home")}</div>
          <h3>Sua casa</h3>
          <p>Disjuntor desarmando, reforma, padrão Light ou automação residencial. Diagnóstico objetivo e prazo combinado.</p>
          <span class="more">Ver serviços residenciais</span>
        </a>
        <a class="card card--link card--profile reveal" href="#setor-predial">
          <div class="icon-box">${iconSvg("building")}</div>
          <h3>Seu prédio / condomínio</h3>
          <p>Laudo, NR-10, nota fiscal e ART para o síndico e a administradora compararem a proposta com segurança jurídica.</p>
          <span class="more">Ver serviços prediais</span>
        </a>
        <a class="card card--link card--profile reveal" href="#setor-industrial">
          <div class="icon-box">${iconSvg("factory")}</div>
          <h3>Sua indústria</h3>
          <p>Parada de máquina, painel, motor e automação. Tempo de resposta e capacidade técnica, com escopo claro.</p>
          <span class="more">Ver serviços industriais</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section" id="servicos">
    <div class="wrap">
      <p class="eyebrow">Serviços</p>
      <h2>O que executamos no Rio de Janeiro</h2>
      <p class="lead">Dez frentes de trabalho. Cada uma tem página própria, com normas e escopo definidos, para o orçamento nascer certo.</p>
      <div class="svc-grid">${cards}</div>
    </div>
  </section>

  <section class="section section--alt" id="obras">
    <div class="wrap">
      <p class="eyebrow">Obras</p>
      <h2>Serviços em foto</h2>
      <p class="lead">Painel, quadro, padrão, motor e automação. O orçamento segue no WhatsApp.</p>
      ${obrasCarousel()}
    </div>
  </section>

  <section class="section" id="setores">
    <div class="wrap">
      <p class="eyebrow">Setores</p>
      <h2>Residencial, predial e industrial: necessidades distintas</h2>
      <div class="grid" style="gap:28px">
        <article class="card" id="setor-residencial">
          <h3>Residencial</h3>
          <p>No Rio, o pedido mais comum é disjuntor que desarma no pico do ar-condicionado, fiação antiga em apartamento da Zona Sul, padrão Light irregular na Zona Oeste ou automação em imóvel já pronto. Você precisa de prazo, confiança e ART quando o serviço exigir.</p>
          <p>Atuamos em instalação elétrica residencial, reforma de quadro, padrão de entrada, sistemas inteligentes e manutenção pontual. Circuito de chuveiro, aterramento e DR fazem parte da NBR 5410. Não são itens opcionais de orçamento.</p>
          <a class="btn btn--outline" href="instalacao-eletrica-residencial-rio-de-janeiro.html">Instalação residencial</a>
        </article>
        <article class="card" id="setor-predial">
          <h3>Predial e condomínios</h3>
          <p>Síndico e administradora comparam proposta por laudo, NR-10, nota fiscal, ART e clareza de escopo. Casa de máquinas, bombas, interface elétrica de elevador, hall, garagem e prumadas exigem planejamento de desligamento com os moradores.</p>
          <p>Entregamos instalação elétrica predial, reforma de PC, painéis de comando de bombas e automação de áreas comuns. Relatório fotográfico e as-built simples entram na pasta do condomínio.</p>
          <a class="btn btn--outline" href="instalacao-eletrica-predial-rio-de-janeiro.html">Instalação predial</a>
        </article>
        <article class="card" id="setor-industrial">
          <h3>Industrial</h3>
          <p>Parada de motor ou painel em Pavuna, Santa Cruz, Campo Grande, Caju, Benfica ou Zona Portuária exige resposta rápida. Montagem de painel, CCM, instalação e manutenção de motores, automação de processo.</p>
          <p>Trabalhamos com equipe própria, NR-10, NR-12 quando aplicável e comissionamento com checklist. Emergência para restabelecer. Preventiva para não repetir a mesma falha.</p>
          <a class="btn btn--outline" href="instalacao-eletrica-industrial-rio-de-janeiro.html">Instalação industrial</a>
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="como-trabalhamos">
    <div class="wrap">
      <p class="eyebrow">Método</p>
      <h2>Como trabalhamos</h2>
      <p class="lead">Quatro etapas. Você sabe o que acontece depois do primeiro contato.</p>
      <div class="steps">
        <article class="step card reveal"><h3>Contato e diagnóstico</h3><p>Entendemos o sintoma, o perfil (casa, prédio ou fábrica) e o bairro. Fotos do quadro aceleram o diagnóstico quando disponíveis.</p></article>
        <article class="step card reveal"><h3>Visita técnica e orçamento</h3><p>Levantamento de cargas, riscos e materiais. Proposta com escopo, prazo e a documentação prevista (ART, laudo, nota fiscal).</p></article>
        <article class="step card reveal"><h3>Execução com equipe própria</h3><p>Não terceirizamos o serviço de campo. Trabalho sob NR-10. Desligamentos combinados com você, o síndico ou a produção.</p></article>
        <article class="step card reveal"><h3>Entrega com garantia</h3><p>Identificação, testes, orientação de uso e garantia por escrito do que foi executado.</p></article>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="diferenciais">
    <div class="wrap">
      <p class="eyebrow">Por que a ELETROSILVA</p>
      <h2>Competência técnica, documentada</h2>
      <ul class="diff-list grid-2">
        <li>${iconSvg("check")}<span><strong>Equipe própria.</strong> Quem orça responde pelo serviço. Sem subempreiteiro anônimo no campo.</span></li>
        <li>${iconSvg("check")}<span><strong>NBR 5410 e NR-10.</strong> Projeto e execução alinhados à norma de instalações e à segurança do trabalho em eletricidade.</span></li>
        <li>${iconSvg("check")}<span><strong>ART e laudo técnico.</strong> Documentação para Light, síndico, seguro e fiscalização, quando o serviço exige.</span></li>
        <li>${iconSvg("check")}<span><strong>Materiais especificados.</strong> Disjuntores, cabos e bornes definidos na proposta. Equivalente somente com aceite por escrito.</span></li>
        <li>${iconSvg("check")}<span><strong>Garantia por escrito.</strong> O que está na proposta está na nota. Sem promessa genérica de satisfação.</span></li>
        <li>${iconSvg("check")}<span><strong>Prazo cumprido.</strong> Data combinada na ordem de serviço. Se houver atraso, comunicamos.</span></li>
      </ul>
    </div>
  </section>

  <section class="section" id="depoimentos">
    <div class="wrap">
      <p class="eyebrow">Prova social</p>
      <h2>Avaliações reais, quando existirem</h2>
      <p class="lead">Não publicamos depoimento inventado nem nota agregada. Quando o perfil Google da ELETROSILVA estiver ativo, as avaliações entram nesta seção.</p>
      <p><a class="btn btn--outline" data-wa="Olá! Vim pelo site e quero um orçamento de serviço elétrico no Rio de Janeiro." href="#contato">Pedir orçamento no WhatsApp</a></p>
    </div>
  </section>

  <section class="section" id="area">
    <div class="wrap">
      <p class="eyebrow">Área de atendimento</p>
      <h2>Atendemos todo o município do Rio de Janeiro</h2>
      <p class="lead">Eletricista no Rio de Janeiro, em todas as zonas da capital. Fora do município, não deslocamos. isso evita lead de Ads que não vamos executar.</p>
      <div class="zones">
        <article class="card"><h3>Centro e adjacências</h3><p>Centro, Lapa, Santa Teresa, Glória, Catumbi, Cidade Nova, Santo Cristo, Gamboa, Saúde, Caju.</p></article>
        <article class="card"><h3>Zona Sul</h3><p>Copacabana, Ipanema, Leblon, Botafogo, Flamengo, Laranjeiras, Humaitá, Gávea, Jardim Botânico, Leme, Urca, São Conrado.</p></article>
        <article class="card"><h3>Zona Norte</h3><p>Tijuca, Vila Isabel, Maracanã, Grajaú, Andaraí, Méier, Engenho de Dentro, Cachambi, Todos os Santos, Piedade, Madureira, Cascadura, Penha, Bonsucesso, Ramos, Olaria, Irajá, Vila da Penha, Pavuna, Anchieta.</p></article>
        <article class="card"><h3>Zona Oeste</h3><p>Barra da Tijuca, Recreio dos Bandeirantes, Jacarepaguá, Freguesia, Taquara, Campo Grande, Santa Cruz, Bangu, Realengo, Padre Miguel, Guaratiba, Vargem Grande.</p></article>
        <article class="card"><h3>Ilha do Governador</h3><p>Jardim Guanabara, Portuguesa, Cocotá, Bancários.</p></article>
      </div>
      <div class="callout">
        <strong>Polos industriais da capital.</strong> Atendimento industrial em Santa Cruz, Campo Grande, Pavuna, Benfica, Caju e Zona Portuária. demanda típica de painel elétrico, motores e automação industrial no município do Rio.
      </div>
      <div class="map-wrap" id="mapa">
        <button type="button" class="map-load" data-map-load data-map-src="https://maps.google.com/maps?q=Rio%20de%20Janeiro%2C%20RJ%2C%20Brasil&z=11&output=embed">Carregar mapa do Rio de Janeiro</button>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="faq">
    <div class="wrap center">
      <p class="eyebrow">FAQ</p>
      <h2>Perguntas frequentes</h2>
      <p class="lead">Respostas diretas. as mesmas dúvidas de quem busca eletricista RJ no Google.</p>
    </div>
    <div class="wrap"><div class="faq">${faq}</div></div>
  </section>

  <section class="section" id="contato">
    <div class="wrap">
      <div class="contact-card card">
        <p class="eyebrow">Orçamento</p>
        <h2>Solicite proposta no WhatsApp</h2>
        <p class="lead">Sem formulário. Fale no WhatsApp com o serviço e o bairro. Retorno em até 24h úteis. Só município do Rio.</p>
        <div class="cta-row">
          <a class="btn btn--primary" data-wa="Olá! Vim pelo site e quero um orçamento de serviço elétrico no Rio de Janeiro." href="#contato">Falar no WhatsApp</a>
          <a class="btn btn--outline" data-href="phone" href="tel:+${PHONE_TEL}">${PHONE_DISPLAY}</a>
        </div>
      </div>
    </div>
  </section>
</main>
${footer()}
</body></html>`;
}

function serviceBodies(slug) {
  const bodies = {
    "reforma-pc-eletrico-rio-de-janeiro": {
      problem: `<p>O painel de comando (PC) ou o quadro de distribuição antigo é um dos maiores riscos silenciosos em casa, prédio e fábrica no Rio de Janeiro. Disjuntor que desarma “sem motivo”, cheiro de bakelite, barramento oxidado, circuitos sem identificação e emendas por cima de emendas: isso não se resolve trocando um disjuntor no escuro. A reforma de PC elétrico reorganiza cargas, proteções e identificação para a instalação voltar a ser legível e segura.</p>
<p>No município do Rio o problema aparece em três frentes. Residencial: apartamentos da Zona Sul e Tijuca com quadro dos anos 70/80 e ar-condicionado novo. Predial: casa de bombas e QGBT de condomínio sem reserva de circuito. Industrial: PC de máquina com fiação improvisada após sucessivas “melhorias” da manutenção. Em todos os casos, a NBR 5410 e a NR-10 orientam o que pode ser reaproveitado e o que precisa sair.</p>
<p>Reformar não é “embelezar o quadro”. É recalcular demanda, seccionar circuitos, corrigir seccionamento e garantir que um curto no chuveiro não derrube a iluminação da escada. ou que um motor não mate o CLP vizinho.</p>`,
      incluso: `<ul>
<li>Inspeção visual e termográfica quando o acesso e a carga permitirem.</li>
<li>Levantamento de circuitos existentes e medição de demanda.</li>
<li>Projeto de reforma do PC/quadro com balanceamento de fases.</li>
<li>Substituição de proteções (disjuntores, DPS, DR) conforme necessidade.</li>
<li>Identificação de bornes, cabos e legendas duráveis.</li>
<li>Testes de seccionamento, continuidade e polaridade.</li>
<li>ART e relatório fotográfico quando o serviço exigir.</li>
</ul>
<p>Não entra no preço-base o que não foi visto: eletroduto embutido rompido, substituição total de prumada ou aumento de carga na Light. Isso vai para aditivo, com o seu ok.</p>`,
      como: `<p>Começamos pelo diagnóstico. Pedimos fotos da face e do interior do quadro. no Rio, muitos síndicos já enviam isso no primeiro WhatsApp, o que acelera a visita. Na inspeção, mapeamos bitolas, origens e sinais de sobrecarga. Só então fechamos lista de material.</p>
<p>A execução é feita com desligamento combinado. Em condomínio, agenda com administradora. Em indústria, janela de produção. Equipe própria, NR-10, bloqueio e etiquetagem quando aplicável. Ao religar, conferimos sequência de fases em motores e tensão em barramentos.</p>
<p>Entregamos o quadro identificado. Se o cliente pedir as-built simplificado, saímos com legendas que o próximo eletricista. ou o técnico da fábrica. consiga ler sem adivinhar.</p>`,
      normas: `<p>NBR 5410 (instalações de baixa tensão), NBR 5419 quando houver DPS a coordenar, NR-10 para o trabalho energizado/desenergizado, e NBR IEC 61439 no que couber a conjuntos de manobra. Em indústria, NR-12 se o PC estiver na interface da máquina. ART no CREA-RJ quando o serviço exigir.</p>`,
      local: `<h2>Reforma de quadro elétrico no município do Rio</h2>
<p>No Centro e na Lapa, o chamado costuma vir de loja e sobrado com quadro de ferro e fusível. Na Zona Sul. Copacabana, Ipanema, Botafogo, Flamengo. o cenário é apartamento com ar-condicionado split somado a um QGBT dos anos 80. Na Tijuca, Grajaú e Méier, casas com anexo e portão motorizado no mesmo disjuntor. Na Barra, Recreio e Jacarepaguá, carga de automação, SPA e carregador. Em Santa Cruz, Campo Grande, Pavuna e Caju, o PC é de processo: contator, relé e CLP no mesmo envelope saturado.</p>
<p>Reformar o painel de comando no Rio de Janeiro também é decidir o momento do desligamento. Prédio na Zona Sul não aceita corte no horário de pico de elevador. Fábrica na Zona Portuária marca madrugada. Residência combina o dia em que a família pode ficar sem chuveiro. Esse combinado entra na OS; não é detalhe.</p>
<p>Se o seu caso é só o padrão de entrada Light, vá para a página de padrão elétrico. Se o quadro interno está quente, desarmando ou ilegível, a reforma de PC é o serviço certo. Os dois juntos são comuns em aumento de carga. orçamos com escopos separados para o síndico ou o dono da casa compararem.</p>`,
      faq: [
        {
          q: "Reforma de PC resolve disjuntor desarmando toda hora?",
          a: "Resolve se a causa for circuito mal dividido, proteção subdimensionada ou conexão ruim. Se a causa for curto na instalação interna ou equipamento defeituoso, o quadro só denuncia o problema. e nós apontamos o próximo passo.",
        },
        {
          q: "Preciso desligar o prédio inteiro?",
          a: "Nem sempre. Muitos QGBT permitem seccionar por bloco. O plano de desligamento sai na visita, não no chute.",
        },
        {
          q: "Vocês identificam circuitos antigos sem etiqueta?",
          a: "Sim, por teste controlado. Demora mais do que um quadro novo, mas evita desligar o lugar errado no futuro.",
        },
        {
          q: "A reforma serve para residência e indústria?",
          a: "Sim. Muda o critério de seletividade e o tipo de envelope (caixa de PVC vs. painel metálico), não a lógica de diagnóstico.",
        },
      ],
    },
    "automacao-industrial-predial-residencial-rio-de-janeiro": {
      problem: `<p>Automação elétrica no Rio de Janeiro virou palavra solta: tem quem venda só interruptor Wi-Fi e tem quem entregue CLP, I/O remoto e supervisório. A ELETROSILVA trata automação como extensão da instalação. comando, potência e segurança no mesmo critério de norma. Sem isso, a “casa inteligente” cai junto com o primeiro raio na Zona Oeste, e a linha industrial fica refém de um programa que ninguém documentou.</p>
<p>Residencial: cenas de iluminação, ar-condicionado, persianas e medição. Predial: bombas, iluminação de áreas comuns, horários e telemetria simples para o síndico. Industrial: intertravamento, partida de motores, receitas de processo e alarme. Três públicos, três arquiteturas. O erro clássico é copiar a residencial para a fábrica.</p>
<p>O problema que resolvemos é perda de controle: carga que não deveria ligar junta, bomba que queima por falta de nível, turno que opera no manual porque o automático “às vezes falha”. Diagnóstico de campo primeiro; catálogo de marca depois.</p>`,
      incluso: `<ul>
<li>Levantamento de pontos de comando, potência e rede.</li>
<li>Especificação de CLP, módulos, IHMs ou sistema predial, conforme o caso.</li>
<li>Quadros de automação e interface com o quadro de força.</li>
<li>Lógica documentada (comentários, tags, backup).</li>
<li>Comissionamento e treinamento do operador/síndico/morador.</li>
<li>ART quando o serviço de engenharia exigir.</li>
</ul>`,
      como: `<p>Mapeamos o que já existe. Imóvel pronto no Leblon não aceita o mesmo critério de eletroduto de galpão em Santa Cruz. Em retrofit residencial, priorizamos módulos em caixa 4x2 e barramentos de automação que não destruam o gesso. Em prédio, conversamos com a administradora sobre horários de barulho e acesso à casa de máquinas. Em indústria, pedimos o diagrama atual. se não houver, desenhamos o as-built mínimo antes de programar.</p>
<p>A implantação segue FAT informal no quadro (teste em bancada quando o painel é nosso) e SAT no local. Backup da lógica fica com o cliente. Sem “caixa-preta” em pendrive do técnico.</p>`,
      normas: `<p>NBR 5410 na força; NR-10 na execução; NR-12 e boas práticas de intertravamento em máquina; IEC 61131 na programação de CLP. Automação predial respeita os limites de carga e seccionamento do quadro existente. não “penduramos” relé em disjuntor saturado.</p>`,
      local: `<h2>Automação no Rio de Janeiro: três recortes</h2>
<p>Automação residencial no Rio de Janeiro pede respeito ao apartamento pronto: shaft estreito, vizinho, síndico e limite de furação. Automação predial pede relógio, bomba e hall. o zelador precisa de modo manual confiável quando o automático falhar. Automação industrial nos polos da capital (Santa Cruz, Campo Grande, Pavuna, Benfica, Caju, porto) pede CLP, I/O e intertravamento, não assistente de voz.</p>
<p>Quem busca “automação residencial Rio de Janeiro” no Google quase sempre já comprou um gadget e se arrependeu. Começamos pelo quadro: se a NBR 5410 não está atendida, o módulo Wi-Fi só mascara sobrecarga. Quem busca automação industrial quer tempo de ciclo e alarme, com backup da lógica. Não misturamos as duas propostas no mesmo PDF.</p>
<p>Atendemos somente o município do Rio. Se a planta está em outro município da região metropolitana, não deslocamos. o site e os anúncios são explícitos nisso para não gerar expectativa.</p>`,
      faq: [
        {
          q: "Dá para automatizar apartamento já acabado no Rio?",
          a: "Sim, com limite. Sem quebrar, o alcance é interruptor, loads em circuito existente e hubs. Função nova que exige cabo será orçada à parte.",
        },
        {
          q: "Vocês ficam presos a uma marca de automação?",
          a: "Especificamos o que o caso pede. Residencial pode ser um ecossistema; industrial pede CLP com suporte local. A decisão vai na proposta.",
        },
        {
          q: "Automação predial reduz conta de luz?",
          a: "Reduz quando apaga área comum vazia e evita bomba em ciclo curto. Não vendemos economia milagrosa sem medição de linha de base.",
        },
        {
          q: "E se a internet cair?",
          a: "Comando crítico (bomba, emergência, intertravamento) não depende de nuvem doméstica. O projeto separa o que é conforto do que é segurança.",
        },
      ],
    },
    "instalacao-eletrica-predial-rio-de-janeiro": {
      problem: `<p>Eletricista predial no Rio de Janeiro atende síndico, administradora e zelador. gente que precisa de laudo, NR-10, nota fiscal e ART para comparar proposta. O problema típico não é “trocar uma lâmpada no hall”: é prumada saturada, QGBT sem seletividade, casa de bombas com comando improvisado, garagem sem DPS e quadro de elevador (interface) sem identificação.</p>
<p>Edifícios da Zona Sul, Tijuca e Barra concentram carga de ar-condicionado e vagas com carregador. Sem estudo, o condomínio descobre o limite na hora do dissídio da Light ou no cheiro de quadro no subsolo. Instalação elétrica predial bem feita antecipa isso: circuitos de áreas comuns, reservas, aterramento e documentação para a pasta do prédio.</p>
<p>Nosso trabalho é deixar a infraestrutura legível. O próximo prestador, o bombeiro e o engenheiro de laudo precisam entender o que está no shaft.</p>`,
      incluso: `<ul>
<li>Instalação e adequação de QGBT e quadros de pavimento.</li>
<li>Circuitos de áreas comuns, bombas, portaria e iluminação de emergência (quando no escopo elétrico).</li>
<li>Aterramento e equipotencialização no que couber à etapa.</li>
<li>Identificação, legendas e relatório fotográfico.</li>
<li>ART, laudo e NF para a administradora.</li>
</ul>
<p>Elevadores são equipamento de outro fornecedor; atuamos na alimentação e no quadro de interface, sem invadir a manutenção da concessionária do elevador.</p>`,
      como: `<p>Reunião curta com síndico/administradora: sintomas, histórico de desarmes, obras recentes de gás/incêndio que mexeram no shaft. Visita técnica em QGBT, casa de máquinas e um pavimento-tipo. Orçamento com janelas de desligamento. predial no Rio não se faz no improviso das 18h sem aviso.</p>
<p>Execução com equipe própria e NR-10. Comunicação no grupo do condomínio quando o desligamento afeta moradores. Entrega com testes e pasta digital (fotos + lista de circuitos).</p>`,
      normas: `<p>NBR 5410, NBR 5413/ISO de iluminância quando mexemos em iluminação de área comum, NR-10, NR-35 se houver trabalho em altura na fachada/shaft, NBR 10898 quando o escopo incluir iluminação de emergência. ART CREA-RJ.</p>`,
      local: `<h2>Eletricista predial em todas as zonas da capital</h2>
<p>Condomínio em Copacabana não tem o mesmo QGBT de um prédio novo na Barra da Tijuca, nem a mesma casa de bombas de um conjunto na Pavuna. O que se repete é a pasta da administradora: precisa de NF, ART, laudo e fotos. Instalação elétrica predial no Rio de Janeiro, para nós, inclui essa papelada. não é extra “se lembrar”.</p>
<p>Chamados frequentes: iluminação de garagem oscilando, bomba que queima contato, quadro do subsolo com cheiro, falta de seletividade (um curto no 10º andar apaga a portaria), pedido de ponto para carregadores nas vagas. Cada um desses itens tem causa raiz no quadro ou na prumada. A visita técnica no município do Rio inclui os dois quando o acesso existir.</p>
<p>Não atendemos Niterói, São Gonçalo, Baixada ou Lagos. Síndico de prédio nessas cidades não deve abrir chamado aqui: o Google Ads está calibrado para a capital, e cumprir isso é parte da operação.</p>`,
      faq: [
        {
          q: "A administradora recebe nota fiscal e ART?",
          a: "Sim. É o mínimo para o condomínio justificar a despesa e o seguro.",
        },
        {
          q: "Vocês fazem laudo NR-10 do prédio inteiro?",
          a: "Fazemos laudo do que inspecionamos e do serviço executado. Laudo global de todas as instalações do edifício é escopo à parte, orçado como inspeção.",
        },
        {
          q: "Atendem condomínio na Zona Sul e na Zona Norte?",
          a: "Sim, em todo o município do Rio de Janeiro. Não atendemos Niterói nem Baixada.",
        },
        {
          q: "Dá para trabalhar só na casa de bombas?",
          a: "Sim. Muitos chamados prediais começam e terminam ali. comando, proteção e reserva de bomba.",
        },
      ],
    },
    "instalacao-eletrica-residencial-rio-de-janeiro": {
      problem: `<p>Instalação elétrica residencial no Rio de Janeiro mistura três realidades: apartamento antigo na Zona Sul com alumínio e bitola justa; casa na Zona Oeste pedindo padrão Light novo; cobertura com spa, carregador e home theater. O sintoma que o morador sente é o mesmo: disjuntor caindo, choque no chuveiro, lâmpada oscilando quando o ar liga.</p>
<p>A NBR 5410 não é detalhe de engenheiro. É o que separa circuito de iluminação de circuito de tomadas, obriga DR em áreas molhadas e dimensiona eletroduto para o calor do verão carioca. “Eletricista de confiança” que junta tudo num disjuntor de 40 A está vendendo risco, não economia.</p>
<p>Projetamos e executamos obra nova, reforma e adequação. O objetivo é uma casa que o eletricista da próxima década ainda entenda. quadro legendado, aterramento existente, seção de cabo honesta.</p>`,
      incluso: `<ul>
<li>Dimensionamento de circuitos e quadro de distribuição.</li>
<li>Passagem de cabos, caixas e pontos (obra nova ou rasgo combinado).</li>
<li>DR, DPS e aterramento conforme o caso.</li>
<li>Ligação de chuveiro, ar-condicionado e fogão elétrico quando no escopo.</li>
<li>Testes e orientação de uso do quadro.</li>
<li>ART quando exigida pelo porte da obra.</li>
</ul>`,
      como: `<p>Levantamento: planta ou croqui, lista de ar-condicionados, chuveiros e futuros carregadores. Visita para ver shaft, laje e quadro atual. Proposta com material de linha especificada. Em apartamento ocupado, trabalhamos por cômodo para não deixar a família no escuro o dia todo.</p>
<p>Na entrega, o quadro não é um emaranhado. Cada disjuntor tem nome. Isso reduz chamado futuro e é o que o seguro e a vistoria gostam de ver.</p>`,
      normas: `<p>NBR 5410, NBR 5419 (DPS), regulamento Light no que toca o padrão de entrada (serviço irmão, página própria), NR-10 na execução. Não misturamos padrão da concessionária com quadro interno sem deixar claro na OS.</p>`,
      local: `<h2>Instalação elétrica residencial no Rio, bairro a bairro</h2>
<p>Em Ipanema, Leblon e Gávea o limite costuma ser o shaft e o horário de obra do prédio. Em casas de Santa Teresa e da Tijuca, a mistura de instalações antigas com anexo novo. Na Barra e no Recreio, demanda de ares, piscina e automação. Em Campo Grande, Bangu e Santa Cruz, padrão Light e quadro interno na mesma reforma. Em todos, o critério é o mesmo: circuito dedicado onde a norma pede, DR em área molhada, identificação no quadro.</p>
<p>O morador que pesquisa “eletricista no Rio de Janeiro” ou “eletricista RJ” quer alguém que emita documento e cumpra prazo, não um superlativo. Por isso o site não diz “melhor da região”. Diz o que é verificável: ART quando o serviço exige, equipe própria, retorno em até 24h úteis, atendimento só na capital.</p>
<p>Se o seu problema é medidor e caixa da concessionária, a página de padrão elétrico Light é o caminho. Se é a fiação da casa, continue aqui. Muitos orçamentos residenciais no Rio fecham os dois serviços na mesma visita. com duas linhas na proposta.</p>`,
      faq: [
        {
          q: "Quanto custa instalação elétrica residencial no Rio?",
          a: "Só depois do levantamento. Metragem, número de ares e estado da fiação mudam o serviço. Primeira resposta em até 24h úteis.",
        },
        {
          q: "Vocês atendem Ipanema, Tijuca e Barra?",
          a: "Sim. Todo o município do Rio de Janeiro. Fora da capital, não.",
        },
        {
          q: "Preciso trocar toda a fiação?",
          a: "Nem sempre. Medimos e abrimos pontos-chave. Troca total entra quando a bitola, o isolamento ou o alumínio não passam no critério de segurança.",
        },
        {
          q: "Instalam ponto para carregador de carro?",
          a: "Sim, com circuito dedicado e proteção correta. Aumento de carga na Light, se necessário, é o serviço de padrão.",
        },
        {
          q: "Emitem ART para reforma de apartamento?",
          a: "Quando o porte e o responsável técnico exigem. Está explícito na proposta.",
        },
      ],
    },
    "instalacao-eletrica-industrial-rio-de-janeiro": {
      problem: `<p>Instalação elétrica industrial no Rio de Janeiro concentra-se em polos da própria capital: Santa Cruz, Campo Grande, Pavuna, Benfica, Caju e Zona Portuária. O cliente é o gerente de manutenção ou de produção. A dor é parada. painel, barramento, motor, ponte rolante, forno, linha de envase. Tempo de resposta e capacidade técnica pesam mais que folder.</p>
<p>Instalação industrial não é “residencial em tamanho grande”. Curto-circuito disponível, seletividade, partida de motor, harmônicas de inversor e NR-12 mudam o projeto. Improviso com cabo paralelo e disjuntor de loja é o que queima o CCM no pior turno.</p>
<p>Entregamos infraestrutura de baixa tensão para máquina e processo: eletrocalha, leito, painéis, ramais e pontos de força com identificação. Emergência para restabelecer; projeto para não repetir.</p>`,
      incluso: `<ul>
<li>Estudo de carga e de seletividade no recorte do escopo.</li>
<li>Lançamento de leitos, eletrocalhas e ramais.</li>
<li>Alimentação de máquinas, CCMs e QGBT industrial.</li>
<li>Aterramento de potência e de massa de máquina no que couber.</li>
<li>Testes de isolamento, sequência de fases e funcional.</li>
<li>Documentação e ART.</li>
</ul>`,
      como: `<p>Kickoff com manutenção: layout, horário de pico, janela de solda/corte. Se a fábrica não tem unifilar, desenhamos o mínimo do trecho que vamos mexer. Material pesado (barramento, disjuntor caixa moldada) entra com prazo de fornecedor explícito na proposta. não prometemos milagre de estoque.</p>
<p>Execução com NR-10, bloqueio e permissão de trabalho do site. Em feriado ou madrugada quando a produção autorizar. Comissionamento com o operador da máquina presente, não só com o eletricista.</p>`,
      normas: `<p>NBR 5410, NBR IEC 61439, NR-10, NR-12, NBR 5419 quando DPS de entrada industrial. Motores: NBR 17094 no que couber à instalação. Light/distribuidora só no ramal de entrada. padrão é serviço separado.</p>`,
      local: `<h2>Instalação elétrica industrial na capital fluminense</h2>
<p>A ELETROSILVA não atende parque fabril da Baixada. Atende indústria e galpão que estão no município do Rio de Janeiro. Isso inclui Santa Cruz e o entorno da Zona Oeste industrial, Campo Grande, Pavuna, Anchieta, Benfica, Caju, Saúde e a Zona Portuária. O Google associa “instalação elétrica industrial Rio de Janeiro” a esses polos. e é exatamente onde deslocamos.</p>
<p>O pedido típico: máquina nova, QGBT sem reserva, ramal de 70 mm² para ontem, painel de comando que ninguém documentou, motor que a manutenção ligou em 220 quando a placa é 380. Instalação elétrica industrial é o trilho de força. Montagem de painel, motores e automação têm páginas próprias e podem entrar no mesmo contrato, com OS distinta.</p>
<p>Emergência existe para restabelecer produção. Preventiva e projeto existem para a próxima parada programada não virar a mesma urgência. O gerente de manutenção que nos chama pela segunda vez já conhece a diferença.</p>
<p>Fora de escopo desta página: padrão de entrada Light (ramal da concessionária), rebobinamento de motor (página de manutenção) e programação de receita de processo sem o ramal de força. Dá para contratar junto; o unifilar e a OS continuam separados para o seu controle de custo e para a ART correspondente.</p>`,
      faq: [
        {
          q: "Atendem emergência de linha parada?",
          a: "Sim, no município do Rio. Triagem no telefone/WhatsApp para saber se é motor, painel ou concessionária.",
        },
        {
          q: "Fazem só o ramal da máquina nova?",
          a: "Sim. É o chamado mais comum: equipamento chegou, QGBT não tem reserva honesta.",
        },
        {
          q: "Trabalham em Santa Cruz e na Zona Portuária?",
          a: "Sim. São polos industriais da capital e estão na nossa área. somente Rio de Janeiro município.",
        },
        {
          q: "Vocês programam CLP junto da instalação?",
          a: "Automação é serviço irmão. Podemos executar os dois no mesmo contrato, com escopos separados na OS.",
        },
      ],
    },
    "sistemas-inteligentes-rio-de-janeiro": {
      problem: `<p>Sistemas inteligentes para casa e prédio no Rio de Janeiro falham quando alguém trata automação como enfeite. Cena de iluminação que depende de nuvem instável, fechadura que não abre na falta de internet, ar-condicionado “inteligente” no mesmo circuito do micro-ondas: isso não é sistema, é gadget.</p>
<p>O que o morador da Gávea ou o síndico de Copacabana quer é previsibilidade: luz que apaga, bomba que não gira em seco, medição que mostra onde a demanda estourou. Construímos a camada inteligente em cima de uma elétrica íntegra. Se o quadro está podre, o primeiro serviço é a reforma. senão o app só empurra o problema.</p>
<p>Trabalhamos retrofit e obra nova. Casa já construída não precisa ser demolida; precisa de projeto honesto sobre o que o eletroduto atual aguenta.</p>`,
      incluso: `<ul>
<li>Projeto de pontos de controle (iluminação, climatização, acesso, cortinas).</li>
<li>Integração com o quadro de distribuição existente ou novo.</li>
<li>Cenas, horários e, quando fizer sentido, medição por circuito.</li>
<li>Documentação dos IDs/dispositivos e backup.</li>
<li>Treinamento de uso. sem jargão de showroom.</li>
</ul>`,
      como: `<p>Workshop de 30–40 minutos: o que é conforto, o que é segurança, o que é vaidade. Cortamos o terceiro. Depois, planta com malha de comando. Em apartamento carioca típico, testamos um cômodo piloto antes de espalhar módulos. Em prédio, um hall ou a casa de bombas como piloto.</p>
<p>Não vendemos ecossistema fechado se o cliente já tem padrão de mercado consolidado. A premissa é manutenção daqui a cinco anos, não o lançamento da CES.</p>`,
      normas: `<p>NBR 5410 na força; boas práticas de cabeamento; NR-10 na instalação. Controle de acesso e CFTV podem exigir outros fornecedores; a interface elétrica permanece nossa.</p>`,
      local: `<h2>Casa e prédio automatizados no Rio de Janeiro</h2>
<p>Sistemas inteligentes no Rio enfrentam dois ambientes: apartamento compacto da Zona Sul e casa espaçosa da Barra/Recreio/Vargem. No primeiro, cada caixa 4x2 importa. No segundo, o risco é espalhar quatro marcas que não conversam. O projeto reduz isso a uma arquitetura. Iluminação, climatização e, se fizer sentido, medição. Fechadura e CFTV só quando a interface elétrica estiver clara.</p>
<p>Prédio inteligente, neste site, não é marketing de “smart building”. É bomba com horário, hall com sensor, garagem com nível e um modo manual que o zelador entende. Síndico compara proposta: queremos que a administradora consiga ler o escopo sem tradutor.</p>
<p>Quem chegou pelo anúncio de automação residencial Rio de Janeiro e na verdade precisa de quadro novo: vamos dizer isso na primeira resposta. Sistema inteligente em cima de disjuntor saturado é desperdício de verba de obra.</p>
<p>Retrofit em imóvel pronto: um cômodo piloto, depois o restante. Obra nova: eletroduto e caixa previstos no projeto, não módulo colado depois da pintura. Prédio: um sistema por vez (bombas ou hall), com modo manual e treinamento do zelador. Essas três regras evitam o chamado de madrugada em que “a casa inteligente apagou tudo”.</p>`,
      faq: [
        {
          q: "Funciona em apartamento antigo da Zona Sul?",
          a: "Sim, com limite de cabeamento. O piloto mostra o que o gesso esconde antes de orçar 20 módulos.",
        },
        {
          q: "Precisa de internet o tempo todo?",
          a: "Conforto pode usar rede. Abertura de portão e iluminação de circulação devem ter modo local.",
        },
        {
          q: "Dá para medir consumo por ar-condicionado?",
          a: "Sim, com bobina ou disjuntor medidor no quadro. desde que o circuito esteja dedicado.",
        },
        {
          q: "É a mesma coisa que automação industrial?",
          a: "Não. Industrial usa CLP e intertravamento. Esta página é casa e prédio. A página de automação cobre os três recortes.",
        },
      ],
    },
    "instalacao-de-motores-eletricos-rio-de-janeiro": {
      problem: `<p>Motor elétrico novo queima no primeiro mês quase sempre por instalação ruim: desalinhamento, tensão desequilibrada, proteção inexistente, sentido de giro invertido, cabo subdimensionado ou inversor parametrizado por tentativa. No Rio de Janeiro, isso aparece em bomba de condomínio, compressor, esteira e ventilador de processo nos polos da capital.</p>
<p>Instalação de motores elétricos é serviço de precisão. Base, chumbadores, acoplamento, aterramento da carcaça, partida (direta, estrela-triângulo, soft-starter, VFD) e proteção térmica/magnética. NR-12 entra quando a máquina tem guarda e intertravamento.</p>
<p>Não “ligamos o motor e vemos se anda”. Medimos, alinhamos e documentamos corrente de partida e regime.</p>`,
      incluso: `<ul>
<li>Checagem de base, nível e alinhamento.</li>
<li>Dimensionamento de ramal, proteção e modo de partida.</li>
<li>Ligação, aterramento e teste de isolação.</li>
<li>Parametrização básica de inversor quando no escopo.</li>
<li>Relatório de corrente, tensão e sentido de giro.</li>
</ul>`,
      como: `<p>Recebemos a placa do motor e a curva da carga (bomba, ventilador, redutor). Conferimos se o QGBT tem reserva real. Agendamos a parada. Em condomínio, avise o síndico: casa de bombas sem água não é surpresa elegante. Em fábrica, a OS de bloqueio sai antes da chave.</p>
<p>Após a partida, acompanhamos temperatura de mancal no tempo combinado. Entregamos os parâmetros do inversor por escrito.</p>`,
      normas: `<p>NBR 17094, NBR 5410 no ramal, NR-10, NR-12, NBR IEC no quadro de partida. Inversores: práticas de cabo blindado e filtro quando o ambiente pede.</p>`,
      local: `<h2>Motores elétricos em condomínio e indústria no Rio</h2>
<p>Na capital, o motor que mais instalamos em predial é o de bomba. recalque, recalque de recalque, pressurizador, recircular. Falha de instalação (sentido de giro, falta de proteção, cabo justo) queima o enrolamento e deixa o prédio sem água. Na indústria do município, o mix é esteira, exaustor, compressor e redutor. Pavuna, Santa Cruz, Campo Grande, Caju e porto concentram esses chamados.</p>
<p>Instalação de motores elétricos não é o mesmo serviço que manutenção. Aqui o motor (novo ou usado em bom estado) entra no lugar com ramal, partida e alinhamento corretos. Se o seu motor já falhou, a página de manutenção é o caminho. inclusive para decidir se vale rebobinar ou substituir.</p>
<p>Não deslocamos para Niterói nem para a Baixada. Se a planta está no Rio, pedimos a placa (tensão, kW, IP, regime) no primeiro contato para não chegar com proteção errada.</p>
<p>Quando chamar este serviço: motor novo ou usado em bom estado que ainda não foi ligado; troca de posição; mudança de partida (direta para soft-starter ou inversor); realinhamento após reforma da base. Não chame instalação se o motor já falhou em operação. aí o diagnóstico é de manutenção. Misturar os dois no mesmo chamado só atrasa a peça certa.</p>
<p>Documentamos corrente de partida, tensão por fase e sentido de giro. Isso vira baseline para a preventiva. Eletricista RJ que “só liga e vai embora” deixa você sem número para comparar no próximo mês. O relatório é curto; o valor é histórico.</p>`,
      faq: [
        {
          q: "Instalam motor trifásico em condomínio?",
          a: "Sim, típico de bombas. Confirmamos se a entrada Light e o quadro predial aguentam a partida.",
        },
        {
          q: "Vocês fornecem o motor?",
          a: "Podemos instalar o motor que você comprar, com responsabilidade sobre a ligação. Fornecimento do equipamento, quando fizer sentido, entra na proposta.",
        },
        {
          q: "Fazem alinhamento a laser?",
          a: "O método de alinhamento (comparador ou laser, conforme a criticidade) sai na proposta. não prometemos ferramenta que não estiver no kit da equipe.",
        },
        {
          q: "Atendem Pavuna e Santa Cruz?",
          a: "Sim. Polos industriais do município do Rio de Janeiro.",
        },
      ],
    },
    "manutencao-de-motores-eletricos-rio-de-janeiro": {
      problem: `<p>Manutenção de motores elétricos no RJ é, na prática, a diferença entre linha andando e linha parada. Rolamento ruidoso, isolação baixa, vibração, sobrecarga cíclica, umidade de galpão próximo à baía. o motor avisa. Quem só espera o fumaça paga frete de rebobinamento urgente e hora extra de produção.</p>
<p>Oferecemos preventiva (medição, inspeção, plano) e corretiva (diagnóstico, retirada, rebobinamento com parceiro especializado, balanceamento, reinstalação). Urgência para linha parada no município do Rio existe; milagre de peça inexistente no Brasil não.</p>
<p>O relatório importa tanto quanto o enrolamento: causa raiz. Motor queima de novo se a proteção ou o alinhamento continuarem errados.</p>`,
      incluso: `<ul>
<li>Diagnóstico em campo: corrente, isolação, temperatura, ruído.</li>
<li>Plano de preventiva com intervalos combinados.</li>
<li>Gestão de rebobinamento e testes de oficina.</li>
<li>Balanceamento e verificação de mancais.</li>
<li>Reinstalação e partida assistida.</li>
</ul>`,
      como: `<p>Chamado de urgência: triagem (cheiro, disjuntor, ruído, já tentou religar?). Se for proteção, resolvemos no painel. Se for o motor, avaliamos troca rápida versus retirada. Preventiva entra em contrato ou OS avulsa, com lista de TAG da fábrica/condomínio.</p>
<p>Não escondemos se a causa é inversor, carga travada ou falta de fase. Manutenção honesta reduz reincidência. e reincidência é o que o gerente de produção mais odeia.</p>`,
      normas: `<p>NR-10 na intervenção, NR-12 na guarda da máquina, NBR 5410 no ramal, boas práticas de rebobinamento (ensaio de isolação e surto na oficina). ART quando o pacote incluir engenharia de falha mais ampla.</p>`,
      local: `<h2>Manutenção de motores elétricos no RJ. urgência e preventiva</h2>
<p>Manutenção de motores elétricos RJ é busca de quem já está com a linha parada ou de quem não quer parar de novo. Os dois perfis entram nesta página. Urgência: diagnóstico em campo no município do Rio, decisão de religar, substituir ou retirar para oficina. Preventiva: rota de TAGs, isolação, rolamento, alinhamento, relatório único para o PCP da manutenção.</p>
<p>Condomínio na Zona Sul e na Tijuca chama quando a casa de bombas silencia no domingo. Indústria em Santa Cruz e na Pavuna chama no meio do turno. A triagem no WhatsApp existe para não mandar equipe completa a um disjuntor desarmado. Equipe própria: quem fala com você é da operação, não de uma central que revende o chamado.</p>
<p>Rebobinamento passa por oficina com ensaio. Se a troca do motor fechar melhor, falamos. Não empurramos enrolamento para ganhar serviço. Causa raiz (falta de fase, sobrecarga mecânica, umidade) vai no relatório. senão o motor volta a queimar no mesmo ponto.</p>
<p>Preventiva no Rio de Janeiro capital funciona em rota: lista de TAG, janela combinada com produção ou com o zelador, medição e o que for intervenção só com OS. Não abrimos motor “por rotina” sem critério. Isolação baixa, folga de mancal, vibração e histórico de desarme são gatilhos. O relatório serve ao PCM. não é folder comercial.</p>
<p>Urgência fora do horário comercial existe para linha parada ou prédio sem água. Não divulgamos SLA genérico de chegada em minutos; a triagem diz se saímos agora ou se é proteção que o plantão da fábrica já pode resetar com segurança.</p>`,
      faq: [
        {
          q: "Rebobinam motor de bomba de prédio?",
          a: "Sim, via oficina parceira com ensaio. Às vezes a troca do motor fecha mais barato. falamos isso na hora.",
        },
        {
          q: "Qual o prazo de uma corretiva urgente?",
          a: "Depende de estoque de motor equivalente e da oficina. Damos prazo real depois do diagnóstico, não no telefone frio.",
        },
        {
          q: "Fazem preventiva em vários motores da planta?",
          a: "Sim. Roteiro por TAG, com relatório único para a manutenção.",
        },
        {
          q: "Atendem só a capital?",
          a: "Somente o município do Rio de Janeiro.",
        },
      ],
    },
    "instalacao-de-padrao-eletrico-rio-de-janeiro": {
      problem: `<p>Padrão elétrico é o conjunto de entrada que a Light exige para ligar ou aumentar a carga no município do Rio de Janeiro. Casa nova, aumento de demanda, padrão enferrujado, medidor irregular ou recusa na vistoria: o morador busca “padrão de entrada Light” e “aprovação Light” porque é exatamente assim que a concessionária nomeia o rito.</p>
<p>Trocar o quadro interno não substitui o padrão. São fronteiras diferentes. O padrão fica no limite da medição; o QGBT distribui a casa. Fazemos os dois quando a obra pede, mas o orçamento deixa a distinção explícita.</p>
<p>O retrabalho caro é montar caixa fora da norma vigente e descobrir na vistoria. Trabalhamos com o regulamento atual da Light para a capital. poste, calçada, aterramento, proteção e disposição da caixa.</p>`,
      incluso: `<ul>
<li>Levantamento da carga pretendida e do tipo de fornecimento.</li>
<li>Projeto e lista de material do padrão de entrada.</li>
<li>Montagem da caixa, proteção e aterramento de entrada.</li>
<li>Acompanhamento da documentação até a ligação, no que couber ao prestador.</li>
<li>Orientação sobre o que o cliente precisa protocolar na Light.</li>
</ul>
<p>Taxas da concessionária e eventuais obras de rede da Light não são nossa nota. Deixamos isso claro na proposta.</p>`,
      como: `<p>Visita: posição atual do medidor, bitola do ramal, espaço na calçada/muro, necessidade de aumento de carga. Cruzamos com o que a Light pede para a categoria. Executamos a montagem, conferimos nivelamento e identificação, e alinhamos a vistoria.</p>
<p>Em condomínio, o padrão predial é outro animal. ramal e medição coletiva. Orçamos à parte do padrão de uma casa.</p>`,
      normas: `<p>Normas e regulamentos da Light para padrão de entrada na área de concessão da capital, NBR 5410 no que conecta ao quadro, NR-10 na montagem, aterramento conforme o tipo de fornecimento. ART quando o responsável técnico assinar o projeto de entrada.</p>`,
      local: `<h2>Padrão de entrada Light em todo o município</h2>
<p>A concessionária da capital é a Light. Por isso esta página usa os termos que o carioca pesquisa: padrão elétrico Light, padrão de entrada Light, aprovação Light. Não é slogan. é o nome do rito. Casa em Campo Grande, sobrado em Ramos, apartamento que virou comércio no Centro, aumento de carga na Barra: o padrão precisa estar no regulamento vigente, não na memória do pedreiro.</p>
<p>Instalação de padrão elétrico no Rio de Janeiro inclui visita para posição da caixa, aterramento, proteção e o que o cliente protocola na concessionária. Taxas da Light não entram na nossa NF. Obra de rede da distribuidora, se existir, também não. Transparência evita o orçamento “tudo incluso” que depois gera extra.</p>
<p>Se o quadro interno está fora de norma, não adianta só a caixa nova na calçada. Indicamos a reforma de PC na mesma visita. Atendimento exclusivo no município do Rio de Janeiro. a Light de outros municípios da região metropolitana não é o nosso recorte operacional.</p>`,
      faq: [
        {
          q: "Vocês fazem o padrão para passar na Light?",
          a: "Montamos dentro do regulamento vigente da capital. A aprovação é ato da concessionária; nosso trabalho é não dar motivo de recusa por execução.",
        },
        {
          q: "Preciso trocar o padrão e o quadro juntos?",
          a: "Muitas vezes sim, se a carga nova estoura os dois. Avaliamos na visita.",
        },
        {
          q: "Atendem Barra, Campo Grande e Zona Norte?",
          a: "Sim, todo o município do Rio. A Light é a concessionária da capital. usamos esse nome porque é o termo de busca real.",
        },
        {
          q: "Cuidam do protocolo na Light?",
          a: "Orientamos o rito e a documentação. Se o protocolo na Light for feito por nós ou pelo cliente, isso fica explícito na proposta.",
        },
        {
          q: "Padrão clandestino vocês regularizam?",
          a: "Regularização passa pela Light. Podemos executar a parte técnica do padrão; não operamos ramal irregular.",
        },
      ],
    },
    "montagem-de-painel-eletrico-rio-de-janeiro": {
      problem: `<p>Montagem de painel elétrico no RJ é o serviço em que a diferença entre oficina séria e “quadro de fundo de loja” aparece no primeiro curto. CCM, quadro de comando, QGBT industrial, painel de bomba, painel de automação: tudo isso exige diagrama, bitola, seccionamento, identificação, grau de proteção e ensaio. Sem isso, o painel vira caixa de surpresa para o próximo técnico.</p>
<p>Indústria da capital (Santa Cruz, Campo Grande, Pavuna, Caju, Benfica, porto) pede prazo e clareza de I/O. Condomínio pede painel de bombas que o zelador consiga operar sem medo. Residência de alto padrão às vezes pede quadro embutido bem feito. ainda assim, a lógica é a mesma: norma, não estética só.</p>
<p>Montamos sob desenho nosso ou do cliente. O que não está no unifilar não entra no fio.</p>`,
      incluso: `<ul>
<li>Leitura ou elaboração de diagrama unifilar e de comando.</li>
<li>Seleção de envelope, barramento, disjuntores, contatores e bornes.</li>
<li>Montagem, ferragem, identificação e duto interno.</li>
<li>Ensaios de continuidade, isolação e funcional em bancada.</li>
<li>Transporte, instalação no local e comissionamento.</li>
<li>As-built e ART.</li>
</ul>`,
      como: `<p>Kickoff de engenharia: lista de cargas, partidas, I/O de automação, ambiente (poeira, mar, calor de subsolo). Congelamos o diagrama. Compramos material de linha combinada. Montagem em bancada para não improvisar no chão da fábrica. FAT com o cliente quando o prazo permitir. No site, içamento/posicionamento, ramais e SAT.</p>
<p>Prazo entra na proposta depois do diagrama aprovado. Urgência existe; mágica com disjuntor de 800 A para o dia seguinte, não.</p>`,
      normas: `<p>NBR IEC 61439 (conjuntos), NBR 5410, NR-10, NR-12 na interface de máquina, grau IP adequado ao ambiente. Identificação segundo boa prática de manutenção (tags iguais às do unifilar).</p>`,
      local: `<h2>Montagem de painel elétrico no Rio de Janeiro</h2>
<p>Montagem de painel elétrico RJ cobre CCM, comando, distribuição e painel de bombas. O cliente industrial dos polos da capital (Santa Cruz, Campo Grande, Pavuna, Caju, Benfica, Zona Portuária) quer prazo depois do unifilar congelado, não antes. O condomínio quer um painel que o zelador opere sem medo. Os dois recebem diagrama, identificação e ensaio. a diferença é o envelope e a lista de cargas.</p>
<p>Não montamos “de cabeça” no chão da obra. Bancada, ferragem, bornes e teste funcional reduzem surpresa no SAT. Se o seu projetista já tem o diagrama, revisamos inconsistência (carga × disjuntor × bitola) antes de cortar cabo. Achado vira pergunta formal, não silêncio constrangedor na energização.</p>
<p>Página irmã: reforma de PC quando o envelope atual permanece e só o interior muda; instalação industrial quando o serviço é leito e ramal, não o conjunto. Orçamento com serviço_type claro ajuda o Google Ads a otimizar o lead certo. e ajuda você a comparar proposta com outro fornecedor sem maçã com laranja.</p>
<p>Materiais: disjuntores, contatores, bornes e cabos de linha combinada na proposta. Equivalente só com o seu aceite por escrito. Painel “mais barato” com componente sem procedência é economia que some no primeiro curto. Grau IP, ventilação e espaço de arco entram no critério. envelope bonito com IP errado em subsolo úmido do Centro do Rio não passa de um verão.</p>`,
      faq: [
        {
          q: "Qual o prazo para montagem de painel elétrico?",
          a: "Depende do diagrama e do material. Após aprovação do unifilar, o prazo vai escrito na OS.",
        },
        {
          q: "Montam CCM e quadro de comando?",
          a: "Sim. São os dois pedidos industriais mais frequentes na capital.",
        },
        {
          q: "Posso enviar o diagrama de outro projetista?",
          a: "Sim. Revisamos inconsistências antes de cortar cabo. Achado vira RFI, não silêncio.",
        },
        {
          q: "O painel vai com certificado?",
          a: "Entregamos relatório de ensaios e documentação. Certificação de tipo de conjunto fechado depende do envelope e do regime. explicamos o que é aplicável ao seu caso.",
        },
      ],
    },
  };
  return bodies[slug];
}

function wordedPage(s) {
  const b = serviceBodies(s.slug);
  const faqHtml = b.faq
    .map(
      (f, i) => `
    <div class="faq-item">
      <button type="button" aria-expanded="false" aria-controls="${s.track}-f${i}" id="${s.track}-b${i}">${f.q}<span>+</span></button>
      <div class="faq-panel" id="${s.track}-f${i}"><p>${f.a}</p></div>
    </div>`
    )
    .join("");
  const related = SERVICES.filter((x) => x.slug !== s.slug)
    .slice(0, 4)
    .map((x) => `<li><a href="${x.slug}.html">${x.short}</a></li>`)
    .join("");

  const ld = [
    ldLocal(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      description: s.description,
      url: `${SITE}/${s.slug}.html`,
      areaServed: { "@type": "City", name: "Rio de Janeiro" },
      provider: { "@type": "Electrician", name: "ELETROSILVA" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: b.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: s.short, item: `${SITE}/${s.slug}.html` },
      ],
    },
  ];

  return `${head({
    title: s.title,
    description: s.description,
    path: `/${s.slug}.html`,
    extra: ld.map(jsonLd).join("\n"),
  })}
<body data-page="servico" data-service="${s.track}">
${gtmBody()}
${headerFixed("servicos")}
<main id="conteudo">
  <section class="page-hero">
    <div class="wrap">
      <nav class="breadcrumb" aria-label="Trilha"><a href="index.html">Início</a> · <span>${s.short}</span></nav>
      <h1>${s.h1}</h1>
      <p>${s.benefit} Equipe própria, ART quando o serviço exige, atendimento só no município do Rio de Janeiro.</p>
      <div class="cta-row">
        <a class="btn btn--primary" data-wa="${s.wa}" href="#contato">Solicitar orçamento no WhatsApp</a>
        <a class="btn btn--ghost" data-href="phone" href="#contato">Ligar agora</a>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="wrap content-split">
      <article class="prose">
        <h2>O problema que resolvemos</h2>
        ${b.problem}
        <h2>O que está incluso</h2>
        ${b.incluso}
        <h2>Como é executado</h2>
        ${b.como}
        <h2>Normas aplicáveis</h2>
        ${b.normas}
        ${b.local}
        <p>Eletricista no Rio de Janeiro, eletricista RJ, eletricista predial Rio de Janeiro e instalação elétrica industrial Rio de Janeiro aparecem nas buscas com intenções diferentes. esta página cobre o serviço <strong>${s.short}</strong> na capital, sem atendimento na Baixada, Niterói ou Lagos.</p>
        <h2>Perguntas frequentes</h2>
        <div class="faq">${faqHtml}</div>
      </article>
      <aside class="sticky-cta">
        <div class="card" id="contato">
          <h3>Orçamento deste serviço</h3>
          <p class="muted">Retorno em até 24h úteis. Só município do Rio.</p>
          <p><a class="btn btn--primary" data-wa="${s.wa}" href="#contato">WhatsApp</a></p>
          <p class="muted"><a data-href="phone" data-fill="phoneDisplay" href="tel:+${PHONE_TEL}">${PHONE_DISPLAY}</a></p>
          <h3 style="margin-top:24px">Outros serviços</h3>
          <ul>${related}</ul>
        </div>
      </aside>
    </div>
  </section>
</main>
${footer()}
</body></html>`;
}

function obrigado() {
  return `${head({
    title: "Pedido recebido | ELETROSILVA",
    description: "Recebemos seu pedido de orçamento. A ELETROSILVA retorna em até 24h úteis.",
    path: "/obrigado.html",
    extra: "",
    robots: "noindex",
  })}
<body data-page="obrigado">
${gtmBody()}
${headerFixed("contato")}
<main id="conteudo" class="thanks">
  <div class="wrap">
    <div class="card thanks-card">
      <h1>Pedido recebido</h1>
      <p>Obrigado. Vamos analisar o serviço e o bairro e retornar em até 24h úteis. Se o caso for emergência de linha parada ou risco, use o WhatsApp e escreva “urgência”.</p>
      <div class="cta-row" style="justify-content:center">
        <a class="btn btn--primary" data-wa="Olá! Vim pelo site e gostaria de adiantar o orçamento pelo WhatsApp." href="index.html">Abrir WhatsApp</a>
        <a class="btn btn--outline" href="index.html">Voltar ao início</a>
      </div>
    </div>
  </div>
</main>
${footer()}
</body></html>`;
}

function privacidade() {
  return `${head({
    title: "Política de privacidade | ELETROSILVA",
    description: "Como a ELETROSILVA trata dados de orçamento no site, em conformidade com a LGPD. Sem CNPJ nesta página.",
    path: "/privacidade.html",
  })}
<body>
${gtmBody()}
${headerFixed("contato")}
<main id="conteudo" class="section">
  <div class="wrap prose">
    <h1>Política de privacidade</h1>
    <p>Esta política descreve como a ELETROSILVA trata dados pessoais coletados neste site, no município do Rio de Janeiro. Não publicamos CNPJ neste site.</p>
    <h2>Controlador</h2>
    <p>ELETROSILVA. serviços elétricos no Rio de Janeiro/RJ. Contato: WhatsApp/telefone <a data-href="phone" data-fill="phoneDisplay" href="tel:+${PHONE_TEL}">${PHONE_DISPLAY}</a>.</p>
    <h2>Dados que coletamos</h2>
    <p>Neste site não há formulário. O orçamento é pedido pelo WhatsApp ou telefone <a data-href="phone" data-fill="phoneDisplay" href="tel:+${PHONE_TEL}">${PHONE_DISPLAY}</a>. Nesse canal podemos receber nome, número, tipo de serviço, bairro e a descrição do problema. Também podemos receber parâmetros de campanha (UTM e gclid) se você chegou por anúncio.</p>
    <h2>Finalidade</h2>
    <p>Responder o pedido de orçamento, tirar dúvidas técnicas, agendar visita e cumprir obrigação legal de documento fiscal quando houver contratação. Não vendemos lista e não usamos seus dados para marketing de terceiro.</p>
    <h2>Base legal</h2>
    <p>Execução de procedimentos preliminares a contrato (art. 7º, V, LGPD) quando você pede proposta pelo WhatsApp, e consentimento quando você envia dados por iniciativa própria.</p>
    <h2>Compartilhamento</h2>
    <p>Ferramentas de medição (Google Tag Manager, GA4, Google Ads) podem processar identificadores técnicos se você chegou por campanha e se os IDs estiverem configurados. Prestador de e-mail/hospedagem trata a mensagem. Não há transferência internacional deliberada além da que esses provedores eventualmente realizam.</p>
    <h2>Retenção</h2>
    <p>Mantemos o lead pelo tempo necessário à proposta e à eventual contratação, e prazos legais de guarda fiscal se virar cliente. Você pode pedir acesso, correção ou exclusão pelo WhatsApp informado nesta página, ressalvadas obrigações legais.</p>
    <h2>Cookies</h2>
    <p>Usamos cookies de medição quando as tags do Google estão ativas. Você pode bloquear no navegador; o site continua utilizável, inclusive o WhatsApp.</p>
    <h2>Atualização</h2>
    <p>Esta versão é de 2026. Alterações relevantes serão publicadas nesta página.</p>
  </div>
</main>
${footer()}
</body></html>`;
}

function notFound() {
  return `${head({
    title: "Página não encontrada | ELETROSILVA",
    description: "A página não existe. Volte à ELETROSILVA. eletricista no Rio de Janeiro.",
    path: "/404.html",
    extra: "",
    robots: "noindex",
  })}
<body>
${gtmBody()}
${headerFixed("home")}
<main id="conteudo" class="thanks">
  <div class="wrap">
    <div class="card thanks-card">
      <h1>Página não encontrada</h1>
      <p>O endereço não existe ou mudou. Siga para a página inicial ou peça orçamento.</p>
      <a class="btn btn--primary" href="index.html">Ir ao início</a>
    </div>
  </div>
</main>
${footer()}
</body></html>`;
}

function sitemap() {
  const urls = ["/", "/privacidade.html", ...SERVICES.map((s) => `/${s.slug}.html`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u === "/" ? "/" : u}</loc>
    <changefreq>${u === "/" ? "weekly" : "monthly"}</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

writeFileSync(join(ROOT, "index.html"), homePage());
SERVICES.forEach((s) => writeFileSync(join(ROOT, `${s.slug}.html`), wordedPage(s)));
writeFileSync(join(ROOT, "obrigado.html"), obrigado());
writeFileSync(join(ROOT, "privacidade.html"), privacidade());
writeFileSync(join(ROOT, "404.html"), notFound());
writeFileSync(join(ROOT, "sitemap.xml"), sitemap());
writeFileSync(
  join(ROOT, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
);

console.log("Páginas geradas:", 1 + SERVICES.length + 3);
