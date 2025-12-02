import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/db.js';
import { success, fail } from '../../utils/response.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { methodNotAllowed } from '../../middlewares/validateMethod.js';
import { sendEmail } from '../../utils/sendEmail.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

// REGISTER
router.post(
  '/register',
  validateBody(['email', 'password', 'name', 'userRoleID']), // 👈 validasi otomatis
  async (req, res, next) => {
    try {
      const { email, password, name, userRoleID } = req.body;

      // Cek email sudah digunakan?
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return fail(res, 'Email sudah terdaftar', 409);
      }

      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hash, name, userRoleID },
      });

      success(res, user, 'User berhasil terdaftar');
    } catch (err) {
      next(err);
    }
  }
);

// LOGIN
router.post('/login',  validateBody(['email', 'password']), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return fail(res, 'User not found', 404);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return fail(res, 'Invalid password', 401);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '1d',
    });
    success(res, { token: token, user: user }, 'Login successful');
  } catch (err) {
    next(err);
  }
});

// 🔹 POST /api/v1/auth/forgot-password
router.post('/forgot-password', validateBody(['email']), async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return fail(res, 'Email tidak ditemukan', 404);

    // Generate reset token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Buat link reset
    const resetLink = `${process.env.FRONTEND_URL}/reset?token=${token}`;

    // Kirim email
    await sendEmail({
      to: user.email,
      subject: 'Reset Password Anda',
      html: `
        <p>Halo ${user.name || 'User'},</p>
        <p>Klik link berikut untuk mengganti password Anda (berlaku 15 menit):</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
      `,
    });

    success(res, null, 'Link reset password telah dikirim ke email Anda.');
  } catch (err) {
    next(err);
  }
});

// 🔹 POST /api/v1/auth/reset-password
router.post('/reset-password', validateBody(['token', 'newPassword']), async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hash password baru
    const hash = await bcrypt.hash(newPassword, 10);

    // Update password di DB
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hash },
    });

    success(res, null, 'Password berhasil diperbarui.');
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return fail(res, 'Token sudah kedaluwarsa', 401);
    if (err.name === 'JsonWebTokenError')
      return fail(res, 'Token tidak valid', 401);
    next(err);
  }
});

router.get('/verify', verifyToken, (req, res) => {
  return res.json({
    success: true,
    message: 'Token valid',
    user: req.user, // data dari token (id, email, dsb.)
  });
});

router.all('*', methodNotAllowed);

export default router;
