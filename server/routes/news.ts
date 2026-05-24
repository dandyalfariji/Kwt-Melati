import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const dataPath = path.join(__dirname, '..', 'data', 'news.json');

// GET /api/news - Get all news
router.get('/', (_req: Request, res: Response) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load news' });
  }
});

// GET /api/news/:id - Get news by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const item = data.find((n: any) => n.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load news item' });
  }
});

// POST /api/news - Add new news item
router.post('/', (req: Request, res: Response) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const newItem = {
      id: data.length > 0 ? Math.max(...data.map((n: any) => n.id)) + 1 : 1,
      ...req.body,
    };
    data.push(newItem);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add news' });
  }
});

export default router;
