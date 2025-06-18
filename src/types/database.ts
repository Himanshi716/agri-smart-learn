
export interface Database {
  public: {
    Tables: {
      crops: {
        Row: {
          id: number;
          crop_name: string;
          botanical_name: string | null;
          family: string | null;
          origin: string | null;
          climate: string | null;
          soil: string | null;
          seed_rate: string | null;
          spacing: string | null;
          fertilizer: {
            FYM?: string;
            NPK?: string;
          } | null;
          sowing_method: string | null;
          pests: string[] | null;
          diseases: string[] | null;
          varieties: string[] | null;
          uses: string[] | null;
          confidence?: number;
          created_at: string;
        };
        Insert: {
          crop_name: string;
          botanical_name?: string;
          family?: string;
          origin?: string;
          climate?: string;
          soil?: string;
          seed_rate?: string;
          spacing?: string;
          fertilizer?: {
            FYM?: string;
            NPK?: string;
          };
          sowing_method?: string;
          pests?: string[];
          diseases?: string[];
          varieties?: string[];
          uses?: string[];
        };
        Update: Partial<Database['public']['Tables']['crops']['Insert']>;
      };
      flashcards: {
        Row: {
          id: number;
          crop_id: number;
          question: string;
          answer: string;
          card_type: 'text' | 'image';
          difficulty: 'easy' | 'medium' | 'hard';
          created_at: string;
        };
        Insert: {
          crop_id: number;
          question: string;
          answer: string;
          card_type?: 'text' | 'image';
          difficulty?: 'easy' | 'medium' | 'hard';
        };
        Update: Partial<Database['public']['Tables']['flashcards']['Insert']>;
      };
      quizzes: {
        Row: {
          id: number;
          crop_id: number;
          question: string;
          options: string[];
          correct_option: number;
          difficulty_level: 'easy' | 'medium' | 'hard';
          explanation: string | null;
          created_at: string;
        };
        Insert: {
          crop_id: number;
          question: string;
          options: string[];
          correct_option: number;
          difficulty_level?: 'easy' | 'medium' | 'hard';
          explanation?: string;
        };
        Update: Partial<Database['public']['Tables']['quizzes']['Insert']>;
      };
      user_progress: {
        Row: {
          id: number;
          user_id: string;
          crop_id: number;
          quizzes_taken: number;
          flashcards_seen: number;
          avg_score: number;
          last_activity: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          crop_id: number;
          quizzes_taken?: number;
          flashcards_seen?: number;
          avg_score?: number;
        };
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>;
      };
      teacher_notes: {
        Row: {
          id: number;
          title: string;
          crop_id: number | null;
          unit_name: string | null;
          file_url: string | null;
          content: string | null;
          uploaded_by: string;
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          title: string;
          crop_id?: number;
          unit_name?: string;
          file_url?: string;
          content?: string;
          uploaded_by: string;
          is_public?: boolean;
        };
        Update: Partial<Database['public']['Tables']['teacher_notes']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          email: string;
          role: 'student' | 'teacher';
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'student' | 'teacher';
          full_name?: string;
          avatar_url?: string;
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
    };
  };
}
