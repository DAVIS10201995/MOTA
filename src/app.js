const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const areaRoutes = require('./routes/areaRoutes');
const funcionRoutes = require('./routes/funcionRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/api/areas', areaRoutes);
app.use('/api/funciones', funcionRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});