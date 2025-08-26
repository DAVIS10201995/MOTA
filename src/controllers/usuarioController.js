const UsuarioService = require('../services/usuarioService');
const  supabase  = require('../config/SupabaseClient');

const UsuarioController = {
  crear: async (req, res) => {
    try {
      const { nombre_completo, correo, id_area, id_funcion, telefono, telefono_consultorio, contrasena, estado } = req.body;
      
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
        correo,
        estado
      };

      const nuevoUsuario = await UsuarioService.crearUsuario(usuarioData);
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  suspender: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.suspenderUsuario(id);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  activar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.activarUsuario(id);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obtenerActivos: async (req, res) => {
    try {
      const usuarios = await UsuarioService.obtenerActivos();
      res.json(usuarios);
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
    const { correo, contrasena } = req.body;
    
    if (!correo || !contrasena) {
      return res.status(400).json({ message: 'Credenciales incompletas' });
    }

    // Debug: Verifica que supabase.rpc existe
    if (!supabase || !supabase.rpc) {
      console.error('Error: supabase.rpc no está disponible');
      throw new Error('Configuración incorrecta de Supabase');
    }

    // Verificación en dos pasos (más robusto)
    // 1. Primero obtén el usuario
    const { data: usuario, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .single();

    if (userError || !usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 2. Luego verifica la contraseña
    const { data: isValid, error: rpcError } = await supabase
      .rpc('verificar_contrasena', {
        correo_param: correo,
        contrasena_plana: contrasena
      });

    if (rpcError || !isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Elimina la contraseña de la respuesta
    const { contrasena: _, ...usuarioSinPassword } = usuario;
    res.json(usuarioSinPassword);

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      error: error.message,
      detalles: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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
  },
  obtenerPorFuncion: async (req, res) => {
  try {
    const { id_funcion } = req.params;
    
    // Validar que el id_funcion sea un número
    if (isNaN(id_funcion)) {
      return res.status(400).json({ error: 'ID de función inválido' });
    }

    const usuarios = await UsuarioService.obtenerPorFuncion(parseInt(id_funcion));
    
    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ 
        message: 'No se encontraron usuarios para esta función' 
      });
    }
    
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
};

module.exports = UsuarioController;