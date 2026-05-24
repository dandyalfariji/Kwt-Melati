async function fetchProduct() {
  try {
    const url = "https://uni-verse-headless-cms.onrender.com/api/v1/public/posts/keripik-tradisional-ibu-isoh";
    const res = await fetch(url, {
      headers: {
        "x-api-key": "uni_d128126206278d0d68e709bba04e854eb3462aec446ed16c"
      }
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

fetchProduct();
