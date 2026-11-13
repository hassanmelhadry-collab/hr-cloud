// تطبيق الجوال: الواجهة تُحفظ على الجهاز وتفتح فورًا؛ البيانات دائمًا من الخادم
const V = 'hr-cloud-018bba8a78';
const PRE = ["./","./assets/tajawal-latin-500-normal-CoYeBiSI.woff2","./assets/tajawal-arabic-500-normal-DoitJjou.woff2","./assets/tajawal-arabic-700-normal-c-WwFYr-.woff2","./assets/tajawal-latin-700-normal-BypgxfGb.woff2","./assets/tajawal-arabic-800-normal-C3W71-SS.woff2","./assets/tajawal-latin-800-normal-CmI34b-g.woff2","./assets/tajawal-arabic-400-normal-DIMBuZnN.woff2","./assets/tajawal-latin-400-normal-BVNSOH3d.woff2","./assets/index-xMNwqCEq.css","./assets/react-0zfkhzTT.js","./assets/supabase-f4bNl52y.js","./assets/charts-D5QWBPPK.js","./assets/xlsx-Cznzrv2E.js","./assets/index-HkPSm2Ll.js","./assets/Profile-BfFl_dFR.js","./assets/PayrollRun-8PD7pGc4.js","./assets/Builder-D8eyw80J.js","./assets/Reports-B9K_R0k_.js","./assets/Dashboard-CnVIP0IX.js","./assets/Settings-8BQTao9g.js","./assets/Fingerprint-DyeryYLq.js","./assets/Org-CDoXrKOi.js","./assets/Ops-h7Gd5Lq-.js","./assets/Admin-D737dJbg.js","./assets/Analytics-n0IRPh6E.js","./assets/charts-CGWPg9x_.js","./assets/MyAttendance-Bi-GWgmE.js","./assets/Nitaqat-hw1PveDj.js","./assets/Governance-DKxPA3TX.js","./assets/Letters-D4UraW3E.js","./assets/ImportExport-C-Zebxf9.js","./assets/EntityPage-CEuuu186.js","./assets/RecordForm-Ct3Uf-kl.js","./assets/companyZip-Bb06zb81.js","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(PRE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const put = (req, res) => { if (res && res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); } return res; };
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return; // طلبات البيانات لا تُخزَّن
  if (u.pathname.includes('/assets/')) { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(x => put(e.request, x)))); return; }
  // الصفحة والإعداد: من الشبكة أولًا (3 ثوانٍ كحد أقصى) ثم من الجهاز
  e.respondWith(new Promise(res => { let done = false; const fb = () => caches.match(e.request).then(r => r || caches.match('./index.html')).then(r => { if (!done && r) { done = true; res(r); } });
    const t = setTimeout(fb, 3000);
    fetch(e.request).then(x => { clearTimeout(t); put(e.request, x); if (!done) { done = true; res(x); } }).catch(() => { clearTimeout(t); fb().then(() => { if (!done) { done = true; res(Response.error()); } }); }); }));
});
