const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function inspect(url) {
  console.log(`\n=== Inspecting ${url} ===`);
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    // Find js files
    const jsMatches = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
    if (!jsMatches) {
      console.log("No index js found");
      return;
    }
    
    const jsUrl = new URL(jsMatches[1], url).toString();
    console.log("JS Bundle URL:", jsUrl);
    
    const jsRes = await fetch(jsUrl);
    const jsText = await jsRes.text();
    
    // Search for API urls or keys
    const apiBaseMatches = jsText.match(/https?:\/\/[^\s"'`]+api\/v1/gi);
    console.log("API Base candidates:", apiBaseMatches);
    
    // Find api keys - usually uni_...
    const apiKeyMatches = jsText.match(/uni_[a-zA-Z0-9]{40,}/g);
    console.log("API Key candidates:", apiKeyMatches);
  } catch (err) {
    console.error("Error inspecting:", err);
  }
}

async function run() {
  await inspect("https://dewisrigba.com");
  await inspect("https://paud.sentrakreasi.org");
}

run();
