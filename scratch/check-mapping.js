const getCmsOrigin = () => {
  return "https://uni-verse-headless-cms.onrender.com";
};

const optimizeGoogleDriveUrl = (url) => {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("drive.google.com")) return url;

  let fileId = "";
  const idMatch = url.match(/[?&]id=([^&#]+)/);
  if (idMatch && idMatch[1]) {
    fileId = idMatch[1];
  } else {
    const dMatch = url.match(/\/file\/d\/([^/]+)/);
    if (dMatch && dMatch[1]) {
      fileId = dMatch[1];
    }
  }

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  }

  return url;
};

const getPostImage = (post) => {
  if (!post) return "";
  const origin = getCmsOrigin();
  let imgUrl = "";
  
  if (typeof post.image === "string" && post.image) {
    if (post.image.startsWith("http") || post.image.startsWith("data:")) {
      imgUrl = post.image;
    } else {
      imgUrl = `${origin}${post.image.startsWith("/") ? "" : "/"}${post.image}`;
    }
  } else if (post.featured_image) {
    if (typeof post.featured_image === "string") {
      if (post.featured_image.startsWith("http") || post.featured_image.startsWith("data:")) {
        imgUrl = post.featured_image;
      } else {
        imgUrl = `${origin}${post.featured_image.startsWith("/") ? "" : "/"}${post.featured_image}`;
      }
    } else if (typeof post.featured_image === "object") {
      if (post.featured_image.url) {
        imgUrl = post.featured_image.url;
      } else if (post.featured_image.path) {
        if (post.featured_image.path.startsWith("http")) {
          imgUrl = post.featured_image.path;
        } else {
          imgUrl = `${origin}${post.featured_image.path.startsWith("/") ? "" : "/"}${post.featured_image.path}`;
        }
      }
    }
  } else if (post.featured_image_url) {
    imgUrl = post.featured_image_url;
  } else if (post.image_url) {
    imgUrl = post.image_url;
  } else if (Array.isArray(post.content) && post.content.length > 0) {
    const firstBlock = post.content[0];
    if (firstBlock) {
      if (typeof firstBlock.featured_image === "string" && firstBlock.featured_image) {
        if (firstBlock.featured_image.startsWith("http")) {
          imgUrl = firstBlock.featured_image;
        } else {
          imgUrl = `${origin}${firstBlock.featured_image.startsWith("/") ? "" : "/"}${firstBlock.featured_image}`;
        }
      } else if (typeof firstBlock.featured_image === "object" && firstBlock.featured_image) {
        if (firstBlock.featured_image.url) {
          imgUrl = firstBlock.featured_image.url;
        } else if (firstBlock.featured_image.path) {
          if (firstBlock.featured_image.path.startsWith("http")) {
            imgUrl = firstBlock.featured_image.path;
          } else {
            imgUrl = `${origin}${firstBlock.featured_image.path.startsWith("/") ? "" : "/"}${firstBlock.featured_image.path}`;
          }
        }
      }
    }
  } else if (Array.isArray(post.content_blocks) && post.content_blocks.length > 0) {
    const firstBlock = post.content_blocks[0];
    if (firstBlock) {
      if (typeof firstBlock.featured_image === "string" && firstBlock.featured_image) {
        if (firstBlock.featured_image.startsWith("http")) {
          imgUrl = firstBlock.featured_image;
        } else {
          imgUrl = `${origin}${firstBlock.featured_image.startsWith("/") ? "" : "/"}${firstBlock.featured_image}`;
        }
      } else if (typeof firstBlock.featured_image === "object" && firstBlock.featured_image) {
        if (firstBlock.featured_image.url) {
          imgUrl = firstBlock.featured_image.url;
        } else if (firstBlock.featured_image.path) {
          if (firstBlock.featured_image.path.startsWith("http")) {
            imgUrl = firstBlock.featured_image.path;
          } else {
            imgUrl = `${origin}${firstBlock.featured_image.path.startsWith("/") ? "" : "/"}${firstBlock.featured_image.path}`;
          }
        }
      }
    }
  }

  return optimizeGoogleDriveUrl(imgUrl);
};

async function checkMapping() {
  try {
    const url = "https://uni-verse-headless-cms.onrender.com/api/v1/public/posts";
    const res = await fetch(url, {
      headers: {
        "x-api-key": "uni_d128126206278d0d68e709bba04e854eb3462aec446ed16c"
      }
    });
    const posts = await res.json();
    for (const post of posts) {
      console.log(`${post.title} -> ${getPostImage(post)}`);
    }
  } catch (err) {
    console.error(err);
  }
}

checkMapping();
