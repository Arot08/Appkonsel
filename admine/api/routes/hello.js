import express from 'express';
const router = express.Router();

// contoh endpoint GET
router.get('/', (req, res) => {
  res.json({ message: 'Hello from modular route 🚀' });
});

// contoh endpoint POST
router.post('/', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name || 'Anonymous'} 👋` });
});

export default router;
