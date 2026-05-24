async function testFetch() {
  const url = 'https://uni-verse-headless-cms.onrender.com/api/v1/public/posts';
  const apiKey = 'uni_d128126206278d0d68e709bba04e854eb3462aec446ed16c';

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': apiKey
      }
    });
    const data = await response.json();
    // print the images of products
    const products = data.filter(p => (p.category || '').toLowerCase() === 'produk');
    products.forEach(p => {
      console.log('--- Product:', p.title);
      console.log('image:', JSON.stringify(p.image, null, 2));
      console.log('featured_image:', JSON.stringify(p.featured_image, null, 2));
      console.log('featured_image_url:', p.featured_image_url);
      console.log('content[0]?.featured_image:', p.content?.[0]?.featured_image);
      console.log('content_blocks[0]?.featured_image:', p.content_blocks?.[0]?.featured_image);
    });
  } catch (err) {
    console.error(err);
  }
}

testFetch();
