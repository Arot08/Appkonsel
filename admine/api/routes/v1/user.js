// api/routes/v1/user.js
import express from "express";
import { success, fail } from "../../utils/response.js";
import { verifyToken } from "../../middlewares/auth.js";
import prisma from "../../config/db.js";
import { methodNotAllowed } from "../../middlewares/validateMethod.js";
import { verifyFrontendToken } from "../../middlewares/auth.js";
import bcrypt from "bcryptjs";

const router = express.Router();

/**
 * GET /api/v1/user/me
 * Mengambil data user dari token JWT
 */
router.get("/me", verifyToken, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) return fail(res, "User tidak ditemukan", 404);

    success(res, user, "Data user berhasil diambil");
  } catch (err) {
    next(err);
  }
});

router.get("/", verifyFrontendToken, async (req, res, next) => {
  try {
    const apps = await prisma.$queryRaw`
      SELECT a.*, b.name AS roleName FROM user a
      JOIN ms_userrole b ON b.id = a.userRoleID
      ORDER BY createdAt DESC
    `;

    success(res, apps, "Data user berhasil diambil");
  } catch (err) {
    next(err);
  }
});

router.post("/create", verifyFrontendToken, async (req, res, next) => {
  try {
    const { email, name, userRoleID, password } = req.body;
    if (!email || !name || !userRoleID || !password) {
      return fail(
        res,
        "Field email, nama, status pengguna, password wajib diisiss",
        400
      );
    }

    const roleId = parseInt(userRoleID);

    if (isNaN(roleId)) {
      return fail(res, "userRoleID harus angka", 400);
    }
    // Cek email sudah digunakan?
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return fail(res, "Email sudah terdaftar", 409);
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, name, userRoleID: roleId },
    });

    success(res, user, "Data user berhasil ditambahkan");
  } catch (err) {
    next(err);
  }
});

router.put("/update/:id", verifyFrontendToken, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    // Ambil data lama
    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      return fail(res, "Data user tidak ditemukan", 404);
    }

    // Build payload update
    const data = {
      email: body.email,
      name: body.name,
      userRoleID: parseInt(body.userRoleID, 10),
    };

    // Jika password dikirim & tidak kosong → update
    if (body.password && body.password.trim() !== "") {
      data.password = await bcrypt.hash(body.password, 10);
    }

    // Update data
    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    success(res, updated, "User berhasil diperbarui");
  } catch (err) {
    next(err);
  }
});

// GET detail by id
router.get("/detail/:id", verifyFrontendToken, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    var formatted = {};
    const result = await prisma.$queryRawUnsafe(`
      SELECT 
       *
      FROM user
      WHERE id = ${id}
    `);

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    } else {
      const a = result[0];

      formatted = {
        ...a,
      };
    }

    success(res, formatted, "Detail user");
  } catch (err) {
    next(err);
  }
});

// GET detail by email
router.get("/email/:email", verifyFrontendToken, async (req, res, next) => {
  try {
    const email = req.params.email;
    var formatted = {};
    const result = await prisma.$queryRawUnsafe(`
      SELECT a.*, b.name AS roleName 
      FROM user a
      JOIN ms_userrole b ON b.id = a.userRoleID
      WHERE a.email = "${email}"
    `);

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    } else {
      const a = result[0];

      formatted = {
        ...a,
      };
    }

    success(res, formatted, "Detail user");
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/delete/:id", verifyFrontendToken, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id } });
    success(res, null, "Informasi berhasil dihapus");
  } catch (err) {
    next(err);
  }
});

router.all("*", methodNotAllowed);

export default router;
