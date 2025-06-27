const UsuarioService = require('../services/usuarioService');

const UsuarioController = {
  crear: async (req, res) => {
    try {
      const { nombre_completo, correo, id_area, id_funcion, telefono, telefono_consultorio, contrasena } = req.body;
      
      if (!correo) {
        return res.status(400).json({ error: 'El campo correo es requerido' });
      }

      const usuarioData = {
        nombre_completo,
        id_area,
        id_funcion,
        telefono,
        telefono_consultorio,
        contrasena,
        correo
      };

      const nuevoUsuario = await UsuarioService.crearUsuario(usuarioData);
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
      const { correo, contrasena } = req.body;
      
      if (!correo || !contrasena) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
      }

      const usuario = await UsuarioService.buscarPorCorreo(correo);
      
      if (!usuario || usuario.contrasena !== contrasena) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      
      // Eliminamos la contraseña de la respuesta
      const { contrasena: _, ...usuarioSinPassword } = usuario;
      res.json(usuarioSinPassword);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  verificarCorreo: async (req, res) => {
    try {
      const { correo } = req.params;
      
      if (!correo) {
        return res.status(400).json({ error: 'El correo es requerido' });
      }

      const { data: existe, error } = await supabase
        .from(Usuario.tableName)
        .select('correo')
        .eq('correo', correo)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no encontrado
        throw error;
      }

      res.json({ disponible: !existe });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UsuarioController;