const { chromium } = require("C:/Users/Cleiton Lisboa/AppData/Local/Temp/eletrosilva-upload/node_modules/playwright-core");
const fs = require("fs");
const path = require("path");
const os = require("os");

const root = process.env.DEPLOY_ROOT || path.join(process.env.TEMP || process.env.TMP, "eletrosilva-deploy-20260921");
const prefixGuess = process.env.HSTGR_PREFIX || "f04f81183caf68bd";
const userData = path.join(os.tmpdir(), "eletrosilva-chrome-profile-live");

function walk(dir, base = "") {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const rel = base ? base + "/" + name : name;
    const st = fs.statSync(abs);
    if (st.isDirectory()) out.push(...walk(abs, rel));
    else out.push({ rel: rel.replace(/\\/g, "/"), abs });
  }
  return out;
}

function extractUrl(text) {
  const m = String(text).match(/https:\/\/srv[0-9]+-files\.hstgr\.io\/[a-z0-9]+\/files[^"\\\s]*/i);
  return m ? m[0].replace(/\\u0026/g, "&").replace(/\\\//g, "/") : null;
}

(async () => {
  const files = walk(root);
  console.log("files", files.length);

  const context = await chromium.launchPersistentContext(userData, {
    channel: "chrome",
    headless: false,
    viewport: null,
    args: ["--start-maximized"],
  });
  const page = context.pages()[0] || (await context.newPage());
  page.setDefaultTimeout(120000);

  // Force auth page first so user clearly logs into THIS browser
  await page.goto(
    "https://auth.hostinger.com/login?redirect_url=" +
      encodeURIComponent(
        "https://hpanel.hostinger.com/websites/eletrosilvaservicos.com/files/file-manager?redirectLocation=side_menu"
      ),
    { waitUntil: "domcontentloaded" }
  );
  console.log("LOGIN_WINDOW_OPEN");
  console.log("Entre com a Hostinger NESTA janela do Chrome (barra amarela de automação).");

  let fmBody = null;
  const deadline = Date.now() + 600000;
  while (Date.now() < deadline) {
    const url = page.url();
    console.log("url", url.slice(0, 130));

    if (url.includes("hpanel.hostinger.com") && !url.includes("auth.hostinger")) {
      const probe = await page
        .evaluate(async () => {
          const tries = [
            {
              u: "/api/rest-hosting/v2/files/file-manager?domain=eletrosilvaservicos.com&username=u460327132",
              h: {},
            },
            {
              u: "/api/rest-hosting/v2/files/file-manager?domain=eletrosilvaservicos.com",
              h: { "X-Username": "u460327132" },
            },
            {
              u: "/api/rest-hosting/v2/files/file-manager?domain=eletrosilvaservicos.com",
              h: { Username: "u460327132" },
            },
          ];
          for (const t of tries) {
            try {
              const r = await fetch(t.u, { credentials: "include", headers: t.h });
              const text = await r.text();
              if (r.status === 200) return { st: 200, t: text.slice(0, 4000), u: t.u };
              console && console.debug;
              if (r.status !== 404) return { st: r.status, t: text.slice(0, 300), u: t.u };
            } catch (e) {
              return { st: 0, t: String(e) };
            }
          }
          return { st: 0, t: "none" };
        })
        .catch(() => ({ st: 0, t: "nav" }));

      console.log("probe", probe.st);
      if (probe.st === 200) {
        fmBody = probe.t;
        break;
      }

      // Try clicking any file manager / open button
      try {
        const clicked = await page.evaluate(() => {
          const els = [...document.querySelectorAll("a,button")];
          const el = els.find((e) => /file manager|gerenciador|abrir|open files/i.test((e.innerText || "") + (e.href || "")));
          if (el) {
            el.click();
            return true;
          }
          return false;
        });
        if (clicked) console.log("clicked-ui");
      } catch (_) {}
    }

    await page.waitForTimeout(3000);
  }

  if (!fmBody) {
    console.log("NO_SESSION");
    await context.close();
    process.exit(2);
  }

  let fileBrowserUrl = extractUrl(fmBody);
  try {
    const j = JSON.parse(fmBody);
    fileBrowserUrl =
      j?.data?.url || j?.data?.redirectUrl || j?.data?.link || j?.data?.fileManagerUrl || extractUrl(j) || fileBrowserUrl;
  } catch (_) {}
  if (!fileBrowserUrl) fileBrowserUrl = "https://srv718-files.hstgr.io/" + prefixGuess + "/files/public_html/";
  console.log("fileBrowserUrl", fileBrowserUrl);

  const fb = await context.newPage();
  await fb.goto(fileBrowserUrl, { waitUntil: "domcontentloaded" });
  await fb.waitForTimeout(3000);
  const pref = (fb.url().match(/hstgr\.io\/([a-z0-9]+)\//i) || [])[1] || prefixGuess;
  console.log("prefix", pref);

  let hasJwt = false;
  for (let i = 0; i < 45; i++) {
    hasJwt = await fb.evaluate(() => !!localStorage.getItem("jwt")).catch(() => false);
    console.log("jwt", hasJwt);
    if (hasJwt) break;
    await fb.waitForTimeout(2000);
  }
  if (!hasJwt) {
    console.log("NO_SESSION");
    await context.close();
    process.exit(2);
  }
  console.log("SESSION_OK uploading", files.length);

  const dirs = [...new Set(files.map((f) => path.posix.dirname(f.rel)).filter((d) => d && d !== "."))];
  for (const d of dirs.sort((a, b) => a.split("/").length - b.split("/").length)) {
    const info = await fb.evaluate(
      async ({ pref, d }) => {
        const token = localStorage.getItem("jwt");
        const r = await fetch("/" + pref + "/api/resources/public_html/" + d + "/?override=false", {
          method: "POST",
          credentials: "include",
          headers: { "X-Auth": token },
        });
        return { d, st: r.status };
      },
      { pref, d }
    );
    console.log("mkdir", JSON.stringify(info));
  }

  let ok = 0;
  for (const f of files) {
    const body = fs.readFileSync(f.abs);
    const isText = /\.(html|css|js|txt|xml|svg|php)$/i.test(f.rel) || /(^|\/)\.htaccess$/i.test(f.rel);
    const payload = isText ? body.toString("utf8") : Array.from(body);
    const info = await fb.evaluate(
      async ({ pref, rel, payload, isText }) => {
        const token = localStorage.getItem("jwt");
        const body = isText ? payload : Uint8Array.from(payload);
        const r = await fetch("/" + pref + "/api/resources/public_html/" + rel + "?override=true", {
          method: "POST",
          credentials: "include",
          headers: { "X-Auth": token },
          body,
        });
        return { rel, st: r.status, len: isText ? payload.length : payload.length };
      },
      { pref, rel: f.rel, payload, isText }
    );
    console.log("uploaded", JSON.stringify(info));
    if (info.st !== 200 && info.st !== 201) {
      console.log("FAIL", f.rel);
      await context.close();
      process.exit(3);
    }
    ok++;
  }

  console.log("done", ok);
  await context.close();
})().catch((e) => {
  console.error("ERR", e && e.message);
  process.exit(1);
});
