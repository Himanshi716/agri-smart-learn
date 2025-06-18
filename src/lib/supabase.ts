
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// These will be provided when Supabase is connected
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Database helper functions
export const cropService = {
  async getAllCrops() {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .order('crop_name');
    
    if (error) throw error;
    return data;
  },

  async getCropById(id: number) {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getCropByName(name: string) {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .ilike('crop_name', `%${name}%`)
      .limit(1);
    
    if (error) throw error;
    return data?.[0];
  },

  async searchCrops(query: string) {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .or(`crop_name.ilike.%${query}%,botanical_name.ilike.%${query}%`)
      .limit(10);
    
    if (error) throw error;
    return data;
  }
};

export const flashcardService = {
  async getFlashcardsByCrop(cropId: number) {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('crop_id', cropId)
      .order('difficulty');
    
    if (error) throw error;
    return data;
  },

  async createFlashcard(flashcard: Database['public']['Tables']['flashcards']['Insert']) {
    const { data, error } = await supabase
      .from('flashcards')
      .insert(flashcard)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const quizService = {
  async getQuizzesByCrop(cropId: number, limit = 5) {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('crop_id', cropId)
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async createQuiz(quiz: Database['public']['Tables']['quizzes']['Insert']) {
    const { data, error } = await supabase
      .from('quizzes')
      .insert(quiz)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
