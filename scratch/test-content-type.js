async function testContentType() {
  const urls = [
    "https://lh3.googleusercontent.com/d/1GS6D6SyWwdbtP0IG_KhHK9o9H0sigpLi=w1200",
    "https://lh3.googleusercontent.com/d/1OOPQYH-X3yqWKsZxfFKr4npZZ9_flgzJ=w1200",
    "https://lh3.googleusercontent.com/d/1P7U-O5b0IaZvBjrZ01m25nMmsyMkikv8=w1200",
    "https://lh3.googleusercontent.com/d/1jTHu98-UGfdi9EYzY4Nokr42moTQ4hBO=w1200"
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`${url} -> Content-Type: ${res.headers.get('content-type')}, Status: ${res.status}`);
    } catch (e) {
      console.log(`${url} -> Error: ${e.message}`);
    }
  }
}

testContentType();
