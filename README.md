# ELETROSILVA — site de captação (Rio de Janeiro)

Site institucional estático para Google Ads Search e SEO local. **Atendimento exclusivo no município do Rio de Janeiro.** Nenhum CNPJ aparece no HTML nem no JSON-LD.

## Como republicar as páginas

Depois de editar copy em `scripts/build.mjs`, rode:

```bash
node scripts/build.mjs
```

Contato, GTM e WhatsApp **não** precisam de rebuild: edite `js/config.js`.

---

## 1. Variáveis para substituir (`js/config.js`)

| Chave | O que colocar |
| --- | --- |
| `phoneDisplay` | Telefone visível, ex. `(21) 4002-8922` |
| `phoneTel` | Só dígitos com DDI, ex. `552140028922` (opcional se o display já tiver DDD) |
| `whatsapp` | Só dígitos, formato internacional, ex. `5521999999999` |
| `email` | Deixe vazio se não houver e-mail público |
| `years` | Anos de mercado (número), ou deixe o placeholder |
| `instagram` | URL completa do perfil, ou deixe vazio |
| `siteUrl` | URL canônica de produção (hoje: `https://www.eletrosilva.com.br`) |
| `formEndpoint` | URL POST do formulário (Formspree, Basin, webhook próprio). Troque `FORM_ENDPOINT` |
| `gtmId` | `GTM-XXXXXXX` |
| `ga4Id` | `G-XXXXXXXXXX` |
| `adsId` | `AW-XXXXXXXXXX` |
| `adsLabel` | Label da conversão do Google Ads |
| `obrasEntregues` | Número (só se for real) |
| `paineisMontados` | Número (só se for real) |

IDs com `XXXX` ou `PREENCHER` **não** carregam GTM/GA4/Ads — proposital.

Atualize também o domínio em `scripts/build.mjs` (`const SITE`) e rode o build de novo para canonical, Open Graph e `sitemap.xml`.

Substitua `img/og-cover.svg` por um JPG/PNG **1200×630** quando tiver foto real de painel/obra (OG de rede social prefere raster).

---

## 2. Itens `[PREENCHER]`

- Anos de mercado (se for publicar o número)
- Números de obras e painéis
- Instagram (opcional)
- IDs GTM, GA4, Google Ads + label
- Endpoint do formulário
- **Depoimentos** (3 cards na home) — não inventar
- Widget **Google Business Profile**
- **6 fotos** da galeria (tipo de obra, bairro, serviço)
- Política de fornecimento de motor
- Se fazem alinhamento a laser
- Se a empresa protocola o padrão na Light ou só orienta o cliente
- Imagem Open Graph 1200×630 (recomendado)

---

## 3. Cinco grupos de anúncio (Search)

Message match: use `?kw=` só com termos da lista em `js/site.js` (o H1 não aceita texto livre).

| Grupo | Palavras-chave (exemplos) | URL de destino |
| --- | --- | --- |
| **Eletricista RJ** | eletricista rio de janeiro, eletricista rj, eletricista no rio | `/` (`index.html`) · `?kw=eletricista%20rio%20de%20janeiro` |
| **Residencial** | instalação elétrica residencial rio de janeiro, eletricista residencial rj | `/instalacao-eletrica-residencial-rio-de-janeiro.html` · `?kw=instalacao%20eletrica%20residencial` |
| **Predial / condomínio** | eletricista predial rio de janeiro, instalação elétrica predial rj, quadro elétrico condomínio rio | `/instalacao-eletrica-predial-rio-de-janeiro.html` |
| **Padrão Light** | padrão elétrico light, padrão de entrada light rio de janeiro, aprovação light padrão | `/instalacao-de-padrao-eletrico-rio-de-janeiro.html` · `?kw=padrao%20eletrico%20light` |
| **Industrial / painel / motores** | montagem de painel elétrico rj, instalação elétrica industrial rio de janeiro, manutenção de motores elétricos rj | `/montagem-de-painel-eletrico-rio-de-janeiro.html` · `/instalacao-eletrica-industrial-rio-de-janeiro.html` · `/manutencao-de-motores-eletricos-rio-de-janeiro.html` |

Negativos sugeridos: Niterói, São Gonçalo, Baixada, Nova Iguaçu, Duque de Caxias, Região dos Lagos, Búzios, Cabo Frio, “curso”, “vaga”, “salário”.

Conversões Ads: `/obrigado.html` (formulário), clique WhatsApp, clique telefone.

---

## 4. Deploy

**Netlify / Cloudflare Pages / Vercel (estático)**  
Arraste a pasta do projeto ou conecte o Git. Publish directory = raiz (onde está `index.html`). Não há build obrigatório.

**Hospedagem tradicional (Apache)**  
Envie todos os arquivos. O `.htaccess` aponta 404 para `404.html`.

**Domínio**  
Aponte o DNS para o host. Depois preencha `siteUrl` e `SITE` e regenere o sitemap.

HTTPS obrigatório antes de ligar Google Ads.

---

## 5. Conformidade do briefing

- **CNPJ:** não há `vatID`, CNPJ nem inscrição estadual no HTML nem no JSON-LD.
- **Endereço:** JSON-LD só com `addressLocality: Rio de Janeiro`, `addressRegion: RJ`, `addressCountry: BR`. Sem `streetAddress`.
- **Área:** somente município do Rio de Janeiro (Centro, Zona Sul, Zona Norte, Zona Oeste, Ilha do Governador). Baixada, Niterói, São Gonçalo e Lagos aparecem só como **exclusão**.
- **AggregateRating:** não implementado (não há avaliações reais).
- **Depoimentos:** placeholders, nenhum texto inventado.
