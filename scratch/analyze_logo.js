const { Jimp } = require('jimp');

async function analyzeLogo() {
  try {
    const image = await Jimp.read('../public/logo-light.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    let colorCounts = {};
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        const hex = image.getPixelColor(x, y).toString(16).padStart(8, '0');
        const alpha = parseInt(hex.substring(6, 8), 16);
        if (alpha > 128) {
          const color = hex.substring(0, 6);
          if (color !== 'ffffff' && color !== '000000') {
            colorCounts[color] = (colorCounts[color] || 0) + 1;
          }
        }
      }
    }
    
    const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
    console.log("Top colors:");
    for(let i = 0; i < Math.min(10, sortedColors.length); i++) {
      console.log(`#${sortedColors[i][0]} - ${sortedColors[i][1]} pixels`);
    }
  } catch (error) {
    console.error("Error reading image:", error);
  }
}

analyzeLogo();
