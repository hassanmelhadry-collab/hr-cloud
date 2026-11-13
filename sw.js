// تطبيق الجوال: الواجهة تُحفظ على الجهاز وتفتح فورًا؛ البيانات دائمًا من الخادم
const V = 'hr-cloud-6ba9dc3576';
const PRE = ["./","./assets/tajawal-latin-400-normal-BVNSOH3d.woff2","./assets/tajawal-arabic-700-normal-c-WwFYr-.woff2","./assets/tajawal-latin-700-normal-BypgxfGb.woff2","./assets/tajawal-latin-500-normal-CoYeBiSI.woff2","./assets/tajawal-arabic-800-normal-C3W71-SS.woff2","./assets/tajawal-latin-800-normal-CmI34b-g.woff2","./assets/tajawal-arabic-500-normal-DoitJjou.woff2","./assets/tajawal-arabic-400-normal-DIMBuZnN.woff2","./assets/index-DlDSeu9U.css","./assets/react-0zfkhzTT.js","./assets/supabase-f4bNl52y.js","./assets/charts-D5QWBPPK.js","./assets/xlsx-Cznzrv2E.js","./assets/index-DkHEEQcw.js","./assets/Profile-CcCJBZmA.js","./assets/PayrollRun-DBEi_JJC.js","./assets/Builder-DUeyeppq.js","./assets/Reports-DPyKB_Le.js","./assets/Dashboard-CRknW48D.js","./assets/Settings-DUwm2qGB.js","./assets/Fingerprint-4fhuJh_d.js","./assets/Org-D9VmoC66.js","./assets/Ops-CLBaGA0a.js","./assets/Admin-DdvvP73Y.js","./assets/Analytics-C2u36p3F.js","./assets/charts-CGWPg9x_.js","./assets/MyAttendance-q2qhGgl6.js","./assets/Nitaqat-vQs9F79z.js","./assets/Governance-Dreq7S7_.js","./assets/Letters-CA-b3Bo0.js","./assets/ImportExport-DC-FmJqK.js","./assets/EntityPage-pd1UafJi.js","./assets/RecordForm-DSa_btwI.js","./assets/companyZip-ox24gMo6.js","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
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
