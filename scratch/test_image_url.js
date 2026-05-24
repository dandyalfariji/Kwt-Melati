const fetch = require('node-fetch');

async function testUrl(url) {
  try {
    const res = await fetch(url, { redirect: 'manual' });
    console.log(url, '=>', res.status);
    if (res.status === 302 || res.status === 303) {
      console.log('Redirects to:', res.headers.get('location'));
    }
  } catch (err) {
    console.error(err);
  }
}

async function run() {
  await testUrl('https://lh3.googleusercontent.com/d/1GS6D6SyWwdbtP0IG_KhHK9o9H0sigpLi=w1200');
  await testUrl('https://drive.google.com/uc?id=1GS6D6SyWwdbtP0IG_KhHK9o9H0sigpLi&export=view');
  await testUrl('https://drive.google.com/thumbnail?id=1GS6D6SyWwdbtP0IG_KhHK9o9H0sigpLi&sz=w1200');
}

run();
