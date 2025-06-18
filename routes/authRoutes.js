// backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Inicio login con Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Callback de Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Crear token JWT
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Redirigir al frontend con token y datos de usuario
    const redirectUrl = `${process.env.CLIENT_URL}/oauth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`;
    res.redirect(redirectUrl);
  }
);

module.exports = router;
