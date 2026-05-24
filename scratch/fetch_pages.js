const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function run() {
  const CMS_API_BASE = 'https://uni-verse-headless-cms.onrender.com/api/v1';
  const CMS_API_KEY = 'uni_d128126206278d0d68e709bba04e854eb3462aec446ed16c';

  const res = await fetch(`${CMS_API_BASE}/public/pages`, {
    headers: { 'x-api-key': CMS_API_KEY }
  });
  const pages = await res.json();
  
  pages.forEach(p => {
    console.log(`Page: ${p.title} (${p.slug})`);
    if (Array.isArray(p.content)) {
      p.content.forEach((block, idx) => {
        console.log(`  Block ${idx + 1}: Type = ${block.type}, Category = ${block.data?.category}, Limit = ${block.data?.limit}`);
      });
    }
  });
}

run();
