const optimizeGoogleDriveUrl = (url) => {
  if (!url || typeof url !== "string") return url;
  const decodedUrl = url.replace(/&amp;/g, "&");
  
  if (!decodedUrl.includes("drive.google.com") && !decodedUrl.includes("googleusercontent.com")) {
    return decodedUrl;
  }

  let fileId = "";
  
  // Try matching drive.google.com id parameter
  const idMatch = decodedUrl.match(/[?&]id=([^&#]+)/);
  if (idMatch && idMatch[1]) {
    fileId = idMatch[1];
  } else {
    // Try matching /file/d/FILE_ID
    const dMatch = decodedUrl.match(/\/file\/d\/([^/]+)/);
    if (dMatch && dMatch[1]) {
      fileId = dMatch[1];
    } else {
      // Try matching lh3.googleusercontent.com/d/FILE_ID
      const lh3Match = decodedUrl.match(/\/d\/([^/=]+)/);
      if (lh3Match && lh3Match[1]) {
        fileId = lh3Match[1];
      }
    }
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}=w1200`;
  }

  return decodedUrl;
};

const testUrls = [
  "https://drive.google.com/thumbnail?id=1GS6D6SyWwdbtP0IG_KhHK9o9H0sigpLi&sz=w1200",
  "https://drive.google.com/thumbnail?id=1OOPQYH-X3yqWKsZxfFKr4npZZ9_flgzJ&sz=w1200",
  "https://drive.google.com/file/d/1P7U-O5b0IaZvBjrZ01m25nMmsyMkikv8/view?usp=sharing",
  "https://lh3.googleusercontent.com/d/1jTHu98-UGfdi9EYzY4Nokr42moTQ4hBO=w1200",
  "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=600"
];

testUrls.forEach(url => {
  console.log(`Original: ${url}\nOptimized: ${optimizeGoogleDriveUrl(url)}\n`);
});
