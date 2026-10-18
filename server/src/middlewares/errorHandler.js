export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Terjadi kesalahan pada server.' : err.message;
  if (status === 500) console.error(err);
  res.status(status).json({ message, errors: err.errors });
}
