// config/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

// Configura estas variables en tu archivo .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;