import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const dataPath = path.join(__dirname, '..', 'data', 'products.json');

// GET /api/products - Get all products
router.get('/', (_req: Request, res: Response) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load products' });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const product = data.find((p: any) => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load product' });
  }
});

// POST /api/products - Add new product
router.post('/', (req: Request, res: Response) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const newProduct = {
      id: data.length > 0 ? Math.max(...data.map((p: any) => p.id)) + 1 : 1,
      ...req.body,
    };
    data.push(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add product' });
  }
});

export default router;
