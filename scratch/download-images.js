import fs from 'fs';
import path from 'path';

async function downloadImages() {
  const urls = [
    { name: "isoh.jpg", url: "https://lh3.googleusercontent.com/d/1GS6D6SyWwdbtP0IG_KhHK9o9H0sigpLi=w1200" },
    { name: "brownis.jpg", url: "https://lh3.googleusercontent.com/d/1OOPQYH-X3yqWKsZxfFKr4npZZ9_flgzJ=w1200" },
    { name: "tepung.jpg", url: "https://lh3.googleusercontent.com/d/1P7U-O5b0IaZvBjrZ01m25nMmsyMkikv8=w1200" },
    { name: "beras.jpg", url: "https://lh3.googleusercontent.com/d/1jTHu98-UGfdi9EYzY4Nokr42moTQ4hBO=w1200" }
  ];

  for (const item of urls) {
    try {
      const res = await fetch(item.url);
      const buffer = await res.arrayBuffer();
      const filePath = path.join('scratch', item.name);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      console.log(`Saved ${item.name}, size: ${buffer.byteLength} bytes`);
    } catch (e) {
      console.log(`Error saving ${item.name}: ${e.message}`);
    }
  }
}

downloadImages();
