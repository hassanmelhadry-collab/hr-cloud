// تطبيق الجوال: الواجهة تُحفظ على الجهاز وتفتح فورًا؛ البيانات دائمًا من الخادم
const V = 'hr-cloud-c8dc84c02d';
const PRE = ["./","./assets/tajawal-arabic-400-normal-DIMBuZnN.woff2","./assets/tajawal-latin-500-normal-CoYeBiSI.woff2","./assets/tajawal-latin-400-normal-BVNSOH3d.woff2","./assets/tajawal-arabic-500-normal-DoitJjou.woff2","./assets/tajawal-arabic-800-normal-C3W71-SS.woff2","./assets/tajawal-latin-700-normal-BypgxfGb.woff2","./assets/tajawal-arabic-700-normal-c-WwFYr-.woff2","./assets/tajawal-latin-800-normal-CmI34b-g.woff2","./assets/index-CIIZ9uxG.css","./assets/react-oT4Df6qO.js","./assets/supabase-f4bNl52y.js","./assets/charts-CR3qbZfe.js","./assets/xlsx-Cznzrv2E.js","./assets/index-CmsGZVie.js","./assets/Profile-D7mJjclZ.js","./assets/PayrollRun-CGLzWjDc.js","./assets/Builder-C-xgE2uV.js","./assets/Reports-ygo9qwJA.js","./assets/Dashboard-DSRBSqBh.js","./assets/EntityPage-2N5LDmkl.js","./assets/RecordForm-Cmn52J9g.js","./assets/Settings-DdSu-NRZ.js","./assets/Fingerprint-muAURI14.js","./assets/Org-KEBoEI9o.js","./assets/Admin-Bg5aJ2FA.js","./assets/Analytics-B_YeUVSS.js","./assets/charts-Bi7MYR5x.js","./assets/Governance-BT_-JcK4.js","./assets/Letters-BrRAAVYp.js","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(PRE)).then(() => self.skipWaiting())); });
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
