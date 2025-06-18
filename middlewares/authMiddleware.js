// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
}

function soloAdmin(req, res, next) {
  if (req.usuario?.rol === 'admin') {
    return next();
  }
  return res.status(403).json({ mensaje: 'Acceso solo para administradores' });
}

module.exports = { verificarToken, soloAdmin };
