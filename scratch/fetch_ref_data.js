const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function fetchFromCMS(endpoint, apiKey) {
  const CMS_API_BASE = 'https://uni-verse-headless-cms.onrender.com/api/v1';
  const res = await fetch(`${CMS_API_BASE}${endpoint}`, {
    headers: { 'x-api-key': apiKey }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function runForSite(name, apiKey) {
  console.log(`\n===========================================`);
  console.log(`DATA FOR: ${name}`);
  console.log(`===========================================`);
  try {
    const settings = await fetchFromCMS('/public/settings', apiKey);
    const pages = await fetchFromCMS('/public/pages', apiKey);
    const navigation = await fetchFromCMS('/public/navigation', apiKey);
    
    console.log("Settings:", JSON.stringify(settings, null, 2));
    console.log("Navigation:", JSON.stringify(navigation, null, 2));
    
    console.log("Pages & their blocks:");
    pages.forEach(p => {
      console.log(`  Page: ${p.title} (slug: ${p.slug})`);
      if (Array.isArray(p.content)) {
        p.content.forEach((block, idx) => {
          console.log(`    Block ${idx + 1}: Type = ${block.type}, data = ${JSON.stringify(block.data)}`);
        });
      }
    });
  } catch (err) {
    console.error(`Failed to fetch for ${name}:`, err);
  }
}

async function run() {
  await runForSite("Dewi Sri GBA", "uni_6c897d04415a68b2ecb063c411f9b4ddfa3e949c3204f827");
  await runForSite("PAUD Husnul Khoir", "uni_fe2e643cc16f3ec7e1147a25dabcb099dccb068367b82cb2");
}

run();
