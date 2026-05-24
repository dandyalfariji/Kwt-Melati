const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function inspectCSS(url) {
  console.log(`\n=== CSS for ${url} ===`);
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    // Find css files
    const cssMatches = html.match(/href="(\/assets\/index-[^"]+\.css)"/);
    if (!cssMatches) {
      console.log("No index css found");
      return;
    }
    
    const cssUrl = new URL(cssMatches[1], url).toString();
    console.log("CSS Bundle URL:", cssUrl);
    
    const cssRes = await fetch(cssUrl);
    const cssText = await cssRes.text();
    
    // Search for colors (hex, rgb, hsl)
    const hexColors = cssText.match(/#[a-fA-F0-9]{3,8}\b/g) || [];
    const rgbColors = cssText.match(/rgba?\([^)]+\)/g) || [];
    const uniqueHex = [...new Set(hexColors)].slice(0, 15);
    const uniqueRgb = [...new Set(rgbColors)].slice(0, 15);
    
    console.log("Common hex colors:", uniqueHex);
    console.log("Common rgb colors:", uniqueRgb);

    // Search for font families
    const fonts = cssText.match(/font-family:[^;]+/g) || [];
    console.log("Font families:", [...new Set(fonts)]);

    // Check custom variables
    const vars = cssText.match(/--[a-zA-Z0-9-]+:[^;]+/g) || [];
    console.log("Custom CSS variables (first 20):", [...new Set(vars)].slice(0, 20));

  } catch (err) {
    console.error("Error inspecting CSS:", err);
  }
}

async function run() {
  await inspectCSS("https://dewisrigba.com");
  await inspectCSS("https://paud.sentrakreasi.org");
}

run();
