// routes/presentacionesRoutes.js
const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const {
  obtenerMisPresentaciones,
  crearPresentacion
} = require('../controllers/presentacionesController');

// ✅ Usa el middleware correctamente
router.get('/mias', verificarToken, obtenerMisPresentaciones);
router.post('/', verificarToken, crearPresentacion);

module.exports = router;
