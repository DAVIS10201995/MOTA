const { createClient } = require('@supabase/supabase-js');

// Verificación estricta de variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('❌ Variables SUPABASE_URL o SUPABASE_KEY no definidas');
}

// Configuración explícita
const options = {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  db: {
    schema: 'public'
  }
};

// Exporta DIRECTAMENTE la instancia (no como objeto)
module.exports = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, options);