// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');
const { obtenerUsuarios } = require('../controllers/adminController');

router.get('/usuarios', verificarToken, soloAdmin, obtenerUsuarios);

module.exports = router;
