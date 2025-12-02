import express from 'express';
import authRoutes from './v1/auth.js';
import userRoutes from './v1/user.js';
import applicationRoutes from './v1/application.js';
import informationRoutes from './v1/information.js';
const router = express.Router();
console.log('✅ Route index.js loaded');
// prefix: /api/v1
router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/application', applicationRoutes);
router.use('/v1/information', informationRoutes);

router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint tidak ditemukan: ${req.originalUrl}`,
  });
});

export default router;
