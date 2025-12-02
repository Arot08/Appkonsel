// api/middlewares/methodNotAllowed.js
export const methodNotAllowed = (req, res) => {
  res.status(405).json({
    success: false,
    message: `Method ${req.method} tidak diizinkan untuk endpoint ${req.originalUrl}`,
  });
};
