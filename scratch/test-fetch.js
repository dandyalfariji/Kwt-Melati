const API_BASE = 'https://uni-verse-headless-cms.onrender.com/api/v1';
const API_KEY = 'uni_d128126206278d0d68e709bba04e854eb3462aec446ed16c';

async function test() {
  try {
    const res = await fetch(`${API_BASE}/public/pages`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    const json = await res.json();
    console.log("Total pages found:", Array.isArray(json) ? json.length : "Not an array");
    if (Array.isArray(json)) {
      json.forEach((page, i) => {
        console.log(`\n--- Page ${i} ---`);
        console.log("id:", page.id);
        console.log("title:", page.title);
        console.log("slug:", page.slug);
        console.log("content-blocks count:", Array.isArray(page.content) ? page.content.length : "Not an array");
        if (Array.isArray(page.content)) {
          page.content.forEach((block, j) => {
            console.log(`  Block ${j}: type=${block.type}, title=${block.data?.title || block.data?.heading || ""}`);
          });
        }
      });
    }
  } catch (err) {
    console.error("Error fetching pages:", err);
  }
}

test();
