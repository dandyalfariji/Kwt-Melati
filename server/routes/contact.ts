import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const dataPath = path.join(__dirname, '..', 'data', 'contacts.json');

// POST /api/contact - Submit contact form
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nama, nomor kontak, dan pesan harus diisi' 
      });
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const newContact = {
      id: data.length > 0 ? Math.max(...data.map((c: any) => c.id)) + 1 : 1,
      name,
      phone,
      message,
      createdAt: new Date().toISOString(),
    };
    data.push(newContact);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    res.status(201).json({ 
      success: true, 
      message: 'Pesan berhasil dikirim!',
      data: newContact 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengirim pesan' });
  }
});

// GET /api/contact - Get all contact messages (admin)
router.get('/', (_req: Request, res: Response) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load contacts' });
  }
});

export default router;
