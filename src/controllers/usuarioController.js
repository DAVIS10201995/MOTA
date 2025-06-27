const UsuarioService = require('../services/usuarioService');

const UsuarioController = {
  crear: async (req, res) => {
    try {
      const usuarioData = req.body;
      const nuevoUsuario = await UsuarioService.crearUsuario(usuarioData);
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obtenerTodos: async (req, res) => {
    try {
      const usuarios = await UsuarioService.obtenerTodos();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.obtenerPorId(id);
      
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const usuarioActualizado = await UsuarioService.actualizarUsuario(id, updateData);
      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      await UsuarioService.eliminarUsuario(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, contrasena } = req.body;
      const usuario = await UsuarioService.buscarPorCredenciales(email, contrasena);
      
      if (!usuario) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UsuarioController;