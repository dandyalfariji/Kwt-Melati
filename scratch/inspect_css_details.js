const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function run() {
  const cssUrl = "https://dewisrigba.com/assets/index-0ECXmYV8.css";
  const res = await fetch(cssUrl);
  const text = await res.text();
  
  // Find theme variables and custom color definitions
  const variables = text.match(/--[a-zA-Z0-9-]+:[^;{}]+/g) || [];
  const uniqueVars = [...new Set(variables)];
  
  console.log("=== All Custom Variables ===");
  uniqueVars.forEach(v => {
    if (v.includes("color") || v.includes("font") || v.includes("spacing") || v.includes("shadow") || v.includes("rounded")) {
      console.log(v.trim());
    }
  });

  // Find font imports
  const fontImports = text.match(/@import[^;]+/g) || [];
  console.log("\n=== Font Imports ===");
  fontImports.forEach(fi => console.log(fi.trim()));
}

run();
