const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // server-side only

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase not configured: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY are missing.');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

module.exports = supabase;
