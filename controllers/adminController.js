// controllers/adminController.js
const pool = require('../database'); // Asegúrate que este path es correcto

exports.obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.nombre, u.email AS correo, u.foto,
             p.titulo, p.fecha_creacion
      FROM usuarios u
      LEFT JOIN (
        SELECT DISTINCT ON (email) email, titulo, fecha_creacion
        FROM presentaciones
        ORDER BY email, fecha_creacion DESC
      ) p ON u.email = p.email
      ORDER BY u.nombre ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener usuarios desde adminController:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};
