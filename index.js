require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
require('./config/passport'); // Configura la estrategia de Google

// Rutas
const authRoutes = require('./routes/authRoutes');
const presentacionesRoutes = require('./routes/presentacionesRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// 🛡️ CORS (habilita solicitudes desde el frontend)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// 🔌 Middleware para JSON
app.use(express.json());

// 🔐 Session y Passport
app.use(session({
  secret: process.env.JWT_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// 🌐 Rutas
app.use('/auth', authRoutes);
app.use('/presentaciones', presentacionesRoutes);
app.use('/admin', adminRoutes);

// ✅ Servidor funcionando
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
