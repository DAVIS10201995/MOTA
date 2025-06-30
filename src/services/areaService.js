const supabase = require('../config/SupabaseClient');
const Area = require('../models/Area');

const AreaService = {
  async createArea(n_area) {
    const { data, error } = await supabase
      .from(Area.tableName)
      .insert([{ n_area }])
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async getAllAreas() {
    const { data, error } = await supabase
      .from(Area.tableName)
      .select('*');
    
    if (error) throw new Error(error.message);
    return data;
  },

  async getAreaById(id) {
    const { data, error } = await supabase
      .from(Area.tableName)
      .select('*')
      .eq('id_area', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async updateArea(id, n_area) {
    const { data, error } = await supabase
      .from(Area.tableName)
      .update({ n_area })
      .eq('id_area', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async deleteArea(id) {
    const { error } = await supabase
      .from(Area.tableName)
      .delete()
      .eq('id_area', id);
    
    if (error) throw new Error(error.message);
    return true;
  }
};

module.exports = AreaService;