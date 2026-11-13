// تطبيق الجوال: الواجهة تُحفظ على الجهاز وتفتح فورًا؛ البيانات دائمًا من الخادم
const V = 'hr-cloud-87d3512085';
const PRE = ["./","./assets/tajawal-arabic-400-normal-DIMBuZnN.woff2","./assets/tajawal-latin-400-normal-BVNSOH3d.woff2","./assets/tajawal-arabic-500-normal-DoitJjou.woff2","./assets/tajawal-arabic-700-normal-c-WwFYr-.woff2","./assets/tajawal-latin-500-normal-CoYeBiSI.woff2","./assets/tajawal-latin-700-normal-BypgxfGb.woff2","./assets/tajawal-latin-800-normal-CmI34b-g.woff2","./assets/tajawal-arabic-800-normal-C3W71-SS.woff2","./assets/index-BPwUiu1m.css","./assets/react-Cr3jetm1.js","./assets/supabase-f4bNl52y.js","./assets/charts-BOW69M33.js","./assets/xlsx-Cznzrv2E.js","./assets/index-HYZssB3U.js","./assets/Profile-CWZ-7mt0.js","./assets/PayrollRun-8HeHbL4b.js","./assets/Builder-DSHLMyY8.js","./assets/Reports-BPv5lEPI.js","./assets/Dashboard-TT_nqUeY.js","./assets/Settings-CM49-jrX.js","./assets/Fingerprint-2SG4HG1z.js","./assets/Org-DXYqtro4.js","./assets/Ops-BluLE1kA.js","./assets/Admin-DhjOYGVM.js","./assets/Analytics-Byzlo0o7.js","./assets/charts-kadVtNXt.js","./assets/MyAttendance-CoIkJ2Z1.js","./assets/Nitaqat-Dmi56DnT.js","./assets/Governance-DXrKwwtw.js","./assets/Letters-CxPnlH_C.js","./assets/ImportExport-BfZkCV4e.js","./assets/EntityPage-Dqjy7VdT.js","./assets/RecordForm-Cfy0aVZo.js","./assets/companyZip-D_Bjd29q.js","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
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
