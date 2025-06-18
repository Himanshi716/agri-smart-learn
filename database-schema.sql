
-- AgriMate Database Schema
-- Run this in your Supabase SQL editor after connecting

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id SERIAL PRIMARY KEY,
  crop_name VARCHAR(100) NOT NULL UNIQUE,
  botanical_name VARCHAR(100),
  family VARCHAR(50),
  origin VARCHAR(100),
  climate TEXT,
  soil TEXT,
  seed_rate VARCHAR(50),
  spacing VARCHAR(50),
  fertilizer JSONB,
  sowing_method TEXT,
  pests TEXT[],
  diseases TEXT[],
  varieties TEXT[],
  uses TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table with roles
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'teacher')),
  full_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id SERIAL PRIMARY KEY,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  card_type VARCHAR(10) DEFAULT 'text' CHECK (card_type IN ('text', 'image')),
  difficulty VARCHAR(10) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_option INTEGER NOT NULL CHECK (correct_option >= 0 AND correct_option < 4),
  difficulty_level VARCHAR(10) DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
  quizzes_taken INTEGER DEFAULT 0,
  flashcards_seen INTEGER DEFAULT 0,
  avg_score DECIMAL(5,2) DEFAULT 0.00,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, crop_id)
);

-- Create teacher notes table
CREATE TABLE IF NOT EXISTS teacher_notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  crop_id INTEGER REFERENCES crops(id) ON DELETE SET NULL,
  unit_name VARCHAR(100),
  file_url TEXT,
  content TEXT,
  uploaded_by UUID REFERENCES users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_crops_name ON crops(crop_name);
CREATE INDEX IF NOT EXISTS idx_flashcards_crop ON flashcards(crop_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_crop ON quizzes(crop_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_teacher_notes_crop ON teacher_notes(crop_id);
CREATE INDEX IF NOT EXISTS idx_teacher_notes_public ON teacher_notes(is_public);

-- Enable Row Level Security
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Crops: Public read access
CREATE POLICY "Public crops access" ON crops FOR SELECT USING (true);

-- Users: Users can read and update their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Flashcards: Public read access
CREATE POLICY "Public flashcards access" ON flashcards FOR SELECT USING (true);
CREATE POLICY "Teachers can manage flashcards" ON flashcards FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'teacher')
);

-- Quizzes: Public read access
CREATE POLICY "Public quizzes access" ON quizzes FOR SELECT USING (true);
CREATE POLICY "Teachers can manage quizzes" ON quizzes FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'teacher')
);

-- User Progress: Users can only see their own progress
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can modify own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Teacher Notes: Public can read public notes, teachers can manage their own
CREATE POLICY "Public can read public notes" ON teacher_notes FOR SELECT USING (is_public = true);
CREATE POLICY "Teachers can view own notes" ON teacher_notes FOR SELECT USING (auth.uid() = uploaded_by);
CREATE POLICY "Teachers can manage own notes" ON teacher_notes FOR ALL USING (auth.uid() = uploaded_by);

-- Function to automatically create user profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert sample crop data
INSERT INTO crops (crop_name, botanical_name, family, origin, climate, soil, seed_rate, spacing, fertilizer, sowing_method, pests, diseases, varieties, uses) VALUES
('Tomato', 'Solanum lycopersicum', 'Solanaceae', 'Peru', '20–25°C, sunny conditions with moderate humidity', 'Well-drained loamy soil, pH 6.0-7.0', '300-400 gm/acre', '60x45 cm', '{"FYM": "20 tons/ha", "NPK": "100:50:50 kg/ha"}', 'Transplanting method', ARRAY['Fruit borer', 'Whitefly', 'Aphids', 'Cutworm'], ARRAY['Leaf curl virus', 'Early blight', 'Late blight', 'Bacterial wilt'], ARRAY['Pusa Ruby', 'Arka Rakshak', 'Himsona', 'Punjab Chhuhara'], ARRAY['Fresh consumption', 'Processing', 'Sauce making', 'Puree production']),
('Wheat', 'Triticum aestivum', 'Poaceae', 'Middle East', '15-20°C during growing season, cool and moist conditions', 'Well-drained fertile loam, pH 6.0-7.5', '100-125 kg/ha', '20-25 cm between rows', '{"FYM": "10-15 tons/ha", "NPK": "120:60:40 kg/ha"}', 'Broadcasting or drilling', ARRAY['Aphids', 'Termites', 'Army worm', 'Shoot fly'], ARRAY['Rust', 'Smut', 'Bunt', 'Leaf blight'], ARRAY['HD-2967', 'PBW-343', 'WH-147', 'DBW-17'], ARRAY['Food grain', 'Flour production', 'Animal feed', 'Straw for cattle']),
('Rice', 'Oryza sativa', 'Poaceae', 'Asia', '20-25°C, high humidity, abundant water supply', 'Clay loam with good water retention, pH 5.5-6.5', '20-25 kg/ha', '20x15 cm', '{"FYM": "12-15 tons/ha", "NPK": "80:40:40 kg/ha"}', 'Transplanting in puddled field', ARRAY['Stem borer', 'Brown plant hopper', 'Leaf folder', 'Gall midge'], ARRAY['Blast', 'Bacterial blight', 'Sheath blight', 'Brown spot'], ARRAY['IR-64', 'Pusa Basmati-1', 'Swarna', 'MTU-7029'], ARRAY['Staple food', 'Rice flour', 'Animal feed', 'Industrial use'])
ON CONFLICT (crop_name) DO NOTHING;
