
// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../database');
require('dotenv').config();

const ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
  : [];

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value.toLowerCase();
  const nombre = profile.displayName;
  const foto = profile.photos[0].value;

  if (!email.endsWith('@tecsup.edu.pe')) {
    return done(null, false);
  }

  await pool.query(`
    INSERT INTO usuarios (nombre, email, foto)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO UPDATE SET nombre = EXCLUDED.nombre, foto = EXCLUDED.foto`,
    [nombre, email, foto]);

  const rol = ADMIN_EMAILS.includes(email) ? 'admin' : 'usuario';
  return done(null, { nombre, email, foto, rol });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
