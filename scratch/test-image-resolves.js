async function testImages() {
  const urls = [
    "https://drive.google.com/thumbnail?id=1GS6D6SyWwdbtP0IG_KhHK9o9H0sigpLi&sz=w1200",
    "https://drive.google.com/thumbnail?id=1OOPQYH-X3yqWKsZxfFKr4npZZ9_flgzJ&sz=w1200",
    "https://drive.google.com/thumbnail?id=1P7U-O5b0IaZvBjrZ01m25nMmsyMkikv8&sz=w1200",
    "https://drive.google.com/thumbnail?id=1jTHu98-UGfdi9EYzY4Nokr42moTQ4hBO&sz=w1200"
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${url} -> ${res.status}`);
    } catch (e) {
      console.log(`${url} -> Error: ${e.message}`);
    }
  }
}

testImages();
