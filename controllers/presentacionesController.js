
// controllers/presentacionesController.js
const pool = require('../database');

exports.obtenerMisPresentaciones = async (req, res) => {
  try {
    const email = req.user.email;
    const result = await pool.query(
      'SELECT id, titulo, contenido, plantilla, fuente, idioma, fecha_creacion FROM presentaciones WHERE email = $1 ORDER BY fecha_creacion DESC',
      [email]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener presentaciones' });
  }
};

exports.crearPresentacion = async (req, res) => {
  try {
    const email = req.user.email;
    const { titulo, contenido, plantilla, fuente, idioma, numero_slides } = req.body;
    const result = await pool.query(
      `INSERT INTO presentaciones (titulo, contenido, email, plantilla, fuente, idioma, numero_slides)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [titulo, contenido, email, plantilla, fuente, idioma, numero_slides]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear presentación' });
  }
};