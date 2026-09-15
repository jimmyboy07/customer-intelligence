const supabase = require('../services/supabase');

async function createCustomer({ name, email, notes }) {
  // Insert and return the created row (expects a `customers` table in Supabase)
  const { data, error } = await supabase
    .from('customers')
    .insert([{ name, email, notes }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getCustomerById(id) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

async function updateSummary(id, summary) {
  const { data, error } = await supabase
    .from('customers')
    .update({ summary })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

module.exports = { createCustomer, getCustomerById, updateSummary };
