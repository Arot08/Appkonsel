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
const uploadDir = path.join(process.cwd(), "public/uploads/information");

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
 * GET /api/v1/information
 * Mengambil semua data informasi
 */
router.get('/', verifyFrontendToken, async (req, res, next) => {
  try {
    const apps = await prisma.$queryRaw`
      SELECT * FROM ms_information
      ORDER BY updatedAt DESC
    `;

    success(res, apps, 'Data informasi berhasil diambil');
  } catch (err) {
    next(err);
  }
});


router.post("/create", verifyFrontendToken, upload.single("image"), async (req, res, next) => {
  try {
    const {
      tautanlink,
    } = req.body;

    if (!tautanlink) {
      return fail(res, "Field tautanlink wajib diisi", 400);
    }

    const imageFilename = req.file ? req.file.filename : null;

    const newApp = await prisma.ms_information.create({
      data: {
        image: imageFilename,
        tautanlink
      },
    });

    success(res, newApp, "Data informasi berhasil ditambahkan");
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
    const existing = await prisma.ms_information.findUnique({
      where: { id },
    });

    if (!existing) {
      return fail(res, "Data aplikasi tidak ditemukan", 404);
    }

    // Siapkan payload update
    const data = {
      tautanlink: body.tautanlink,
    };

    // Jika ada file baru, update gambar
    if (file) {
      const uploadDir = path.join(process.cwd(), "public/uploads/information");

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
    const updated = await prisma.ms_information.update({
      where: { id },
      data,
    });

    success(res, updated, "Informasi berhasil diperbarui");
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
       *
      FROM ms_information
      WHERE id = ${id}
    `);

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    } else {
      const a = result[0];

      formatted = {
        ...a,
        image: a.image ? `${baseUrl}/uploads/information/${a.image}` : null,
      };
    }

    success(res, formatted, "Detail information");
  } catch (err) {
    next(err);
  }
});



// DELETE
router.delete("/delete/:id", verifyFrontendToken, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.ms_information.delete({ where: { id } });
    success(res, null, "Informasi berhasil dihapus");
  } catch (err) {
    next(err);
  }
});

router.all('*', methodNotAllowed);

export default router;
