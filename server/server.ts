import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import productsRouter from './routes/products';
import newsRouter from './routes/news';
import galleryRouter from './routes/gallery';
import statsRouter from './routes/stats';
import contactRouter from './routes/contact';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/news', newsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/stats', statsRouter);
app.use('/api/contact', contactRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'KWT Melati Sorgum API is running',
    timestamp: new Date().toISOString()
  });
});

// Image proxy - fetches Google Drive images server-side to bypass CORS
// Follows redirects internally so the browser always gets the final image
function fetchAndProxy(targetUrl: string, res: any, redirectCount = 0): void {
  if (redirectCount > 5) {
    if (!res.headersSent) res.status(508).json({ error: 'Too many redirects' });
    return;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    if (!res.headersSent) res.status(400).json({ error: 'Invalid URL' });
    return;
  }

  const client = targetUrl.startsWith('https') ? https : http;
  const options = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.pathname + parsedUrl.search,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'image/*,*/*',
      'Referer': 'https://drive.google.com/',
    },
  };

  const proxyReq = client.request(options, (proxyRes) => {
    // Follow redirect server-side
    if ((proxyRes.statusCode === 301 || proxyRes.statusCode === 302 || proxyRes.statusCode === 303) && proxyRes.headers.location) {
      proxyRes.resume(); // consume and discard body
      fetchAndProxy(proxyRes.headers.location, res, redirectCount + 1);
      return;
    }

    // Set cache and CORS headers
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const contentType = proxyRes.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.status(proxyRes.statusCode || 200);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err: Error) => {
    console.error('Image proxy error:', err.message);
    if (!res.headersSent) res.status(502).json({ error: 'Failed to fetch image' });
  });

  proxyReq.setTimeout(12000, () => {
    proxyReq.destroy();
    if (!res.headersSent) res.status(504).json({ error: 'Image fetch timed out' });
  });

  proxyReq.end();
}

app.get('/api/img-proxy', (req, res) => {
  const encodedUrl = req.query.url as string;
  if (!encodedUrl) {
    res.status(400).json({ error: 'Missing url parameter' });
    return;
  }

  let targetUrl: string;
  try {
    targetUrl = decodeURIComponent(encodedUrl);
  } catch {
    res.status(400).json({ error: 'Invalid url parameter' });
    return;
  }

  // Security: only allow Google Drive / googleusercontent domains
  const allowedHosts = ['drive.google.com', 'lh3.googleusercontent.com', 'docs.google.com'];
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    res.status(400).json({ error: 'Invalid URL format' });
    return;
  }

  const isAllowed = allowedHosts.some(h => parsedUrl.hostname === h || parsedUrl.hostname.endsWith('.' + h));
  if (!isAllowed) {
    res.status(403).json({ error: 'Forbidden host' });
    return;
  }

  fetchAndProxy(targetUrl, res);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`\n🌿 KWT Melati Sorgum API Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🔗 API Health Check:  http://localhost:${PORT}/api/health`);
  console.log(`📦 Products API:      http://localhost:${PORT}/api/products`);
  console.log(`📰 News API:          http://localhost:${PORT}/api/news`);
  console.log(`🖼️  Gallery API:       http://localhost:${PORT}/api/gallery`);
  console.log(`📊 Stats API:         http://localhost:${PORT}/api/stats`);
  console.log(`📬 Contact API:       http://localhost:${PORT}/api/contact`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

export default app;
