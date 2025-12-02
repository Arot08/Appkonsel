import express from 'express';
import prisma from '../../config/db.js';
import { verifyFrontendToken } from '../../middlewares/auth.js';
import { success, fail } from '../../utils/response.js';
import { methodNotAllowed } from '../../middlewares/validateMethod.js';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(process.cwd(), "public/uploads/apps");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `app-${uniqueSuffix}`);
  },
});

const upload = multer({ storage });

/**
 * GET /api/v1/application
 * Mengambil semua data aplikasi
 */
router.get('/', verifyFrontendToken, async (req, res, next) => {
  try {
    const apps = await prisma.$queryRaw`
      SELECT a.*, 
             b.name AS availabilityName, 
             c.name AS developerName, 
             d.name AS categoryName,
             e.name AS statusName
      FROM ms_application a
      LEFT JOIN lk_availability b ON b.id = a.availability
      LEFT JOIN lk_developer c ON c.id = a.developer
      LEFT JOIN lk_category d ON d.id = a.category
      LEFT JOIN lk_status e ON e.id = a.status
      ORDER BY a.createdAt DESC
    `;

    success(res, apps, 'Data aplikasi berhasil diambil');
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/application information
 * Mengambil semua data informasi aplikasi
 */
router.get('/information', verifyFrontendToken, async (req, res, next) => {
  try {
    const apps = await prisma.$queryRaw`
      SELECT a.*, 
             b.name AS availabilityName, 
             c.name AS developerName, 
             d.name AS categoryName,
             e.name AS statusName
      FROM ms_application a
      LEFT JOIN lk_availability b ON b.id = a.availability
      LEFT JOIN lk_developer c ON c.id = a.developer
      LEFT JOIN lk_category d ON d.id = a.category
      LEFT JOIN lk_status e ON e.id = a.status
      ORDER BY a.createdAt DESC
    `;

    success(res, apps, 'Data aplikasi banner berhasil diambil');
  } catch (err) {
    next(err);
  }
});


/**
 * GET /api/v1/application/:id
 * Mengambil detail aplikasi berdasarkan ID
 */
router.get('/:id', verifyFrontendToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const app = await prisma.ms_application.findUnique({
      where: { id: Number(id) },
    });

    if (!app) return fail(res, 'Aplikasi tidak ditemukan', 404);

    success(res, app, 'Detail aplikasi berhasil diambil');
  } catch (err) {
    next(err);
  }
});


// GET detail by id
router.get("/detail/:id", verifyFrontendToken, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const baseUrl = `${process.env.FRONTEND_URL}`;
    var formatted = {};
    const result = await prisma.$queryRawUnsafe(`
      SELECT 
        a.*,
        b.name AS availabilityName,
        c.name AS developerName,
        d.name AS categoryName,
        e.name AS statusName
      FROM ms_application a
      LEFT JOIN lk_availability b ON b.id = a.availability
      LEFT JOIN lk_developer c ON c.id = a.developer
      LEFT JOIN lk_category d ON d.id = a.category
      LEFT JOIN lk_status e ON e.id = a.status
      WHERE a.id = ${id}
    `);

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    } else {
      const a = result[0];

      formatted = {
        ...a,
        image: a.image ? `${baseUrl}/uploads/apps/${a.image}` : null,
      };
    }

    success(res, formatted, "Detail aplikasi");
  } catch (err) {
    next(err);
  }
});



router.post("/create", verifyFrontendToken, upload.single("image"), async (req, res, next) => {
  try {
    const {
      title,
      type,
      status,
      availability,
      developer,
      category,
      tautanapp,
      desc,
    } = req.body;

    if (!title || !type || !status) {
      return fail(res, "Field title, type, dan status wajib diisi", 400);
    }

    const imageFilename = req.file ? req.file.filename : null;

    const newApp = await prisma.ms_application.create({
      data: {
        image: imageFilename,
        title,
        type,
        status: Number(status),
        availability: Number(availability),
        developer: Number(developer),
        category: Number(category),
        tautanapp,
        desc,
      },
    });

    success(res, newApp, "Data aplikasi berhasil ditambahkan");
  } catch (err) {
    next(err);
  }
});

router.put("/update/:id", verifyFrontendToken, upload.single("image"), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const file = req.file;

    // Ambil data lama
    const existing = await prisma.ms_application.findUnique({
      where: { id },
    });

    if (!existing) {
      return fail(res, "Data aplikasi tidak ditemukan", 404);
    }

    // Siapkan payload update
    const data = {
      title: body.title,
      tautanapp: body.tautanapp,
      type: body.type,
      status: body.status ? Number(body.status) : null,
      availability: body.availability ? Number(body.availability) : null,
      developer: body.developer ? Number(body.developer) : null,
      category: body.category ? Number(body.category) : null,
      desc: body.desc,
    };

    // Jika ada file baru, update gambar
    if (file) {
      const uploadDir = path.join(process.cwd(), "public/uploads/apps");

      // Hapus file lama jika ada
      if (existing.image) {
        const oldImagePath = path.join(uploadDir, existing.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Simpan filename baru
      data.image = file.filename;
    }

    // Update data
    const updated = await prisma.ms_application.update({
      where: { id },
      data,
    });

    success(res, updated, "Aplikasi berhasil diperbarui");
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/delete/:id", verifyFrontendToken, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.ms_application.delete({ where: { id } });
    success(res, null, "Aplikasi berhasil dihapus");
  } catch (err) {
    next(err);
  }
});

router.all('*', methodNotAllowed);

export default router;
