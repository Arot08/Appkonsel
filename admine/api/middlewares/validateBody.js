// api/middlewares/validateBody.js
export const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Body request tidak boleh kosong'
      });
    }

    const missing = requiredFields.filter(field => !req.body[field]);
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Field berikut wajib diisi: ${missing.join(', ')}`
      });
    }

    next();
  };
};
