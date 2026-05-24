const testContents = [
  "<p>https://media.istockphoto.com/id/1429532541/id/foto/biofuel-dan-booming-baru-makanan-industri-perkebunan-sorgum-bidang-manis-bebas-gluten-tangkai.jpg</p><p></p><p>gluten</p>",
  "<p>gluten</p><p>https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=600</p>",
  "<p>gluten https://drive.google.com/file/d/1aVnLzkXjK3ke3aZSOic4MmO5zOveefsS/view?usp=sharing</p>"
];

const urlRegex = /(https?:\/\/[^\s<"']*(?:\.jpg|\.jpeg|\.png|\.webp|\.gif|\.svg|drive\.google\.com|unsplash\.com|pexels\.com|pixabay\.com|istockphoto\.com|googleusercontent\.com)[^\s<"']*)/i;

testContents.forEach((tabContent, idx) => {
  console.log(`\n--- Test ${idx + 1} ---`);
  const urlMatch = tabContent.match(urlRegex);
  console.log("urlMatch:", urlMatch ? urlMatch[1] : "No match");

  if (urlMatch) {
    const extractedImage = urlMatch[1];
    const escapedUrl = urlMatch[1].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const tagRegex = new RegExp(`<[^>]+>\\s*${escapedUrl}\\s*<\/[^>]+>`, 'i');
    console.log("tagRegex test:", tagRegex.test(tabContent));
    
    let cleanContent = tabContent;
    if (tagRegex.test(tabContent)) {
      cleanContent = tabContent.replace(tagRegex, "");
    } else {
      cleanContent = tabContent.replace(urlMatch[0], "");
    }
    console.log("cleanContent:", cleanContent);
  }
});
