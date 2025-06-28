// config/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

// Configura estas variables en tu archivo .env
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Faltan variables de Supabase. Verifica Render Environment.');
}

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY
);

module.exports = supabase;