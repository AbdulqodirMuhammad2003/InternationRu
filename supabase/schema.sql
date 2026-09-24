-- Avangard platformasi uchun Supabase (PostgreSQL) sxemasi.
--
-- Ishlatish: Supabase dashboard → SQL Editor → yangi query → shu faylning
-- to'liq matnini joylashtirib "Run" bosing (bir marta, loyiha yaratilganda).
-- Keyinchalik sxemaga o'zgartirish kiritilsa, shu faylga ham mos ravishda
-- alohida "ALTER TABLE ..." migratsiyasi qo'shiladi va Supabase'da qo'lda
-- qayta ishga tushiriladi — endi ilova ishga tushganda avtomatik
-- qo'llanilmaydi (avvalgi SQLite versiyasidagi kabi emas), shu bilan
-- "jadval topilmadi" turidagi xatolar oldini olinadi.

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  course TEXT DEFAULT 'Rus tili kursi',
  level TEXT DEFAULT 'A1',
  coins INTEGER DEFAULT 0,
  stars INTEGER DEFAULT 0,
  branch_rank INTEGER DEFAULT 0,
  group_rank INTEGER DEFAULT 0,
  battle_wins INTEGER DEFAULT 0,
  august_average REAL DEFAULT 0,
  reading_pct INTEGER DEFAULT 0,
  writing_pct INTEGER DEFAULT 0,
  listening_pct INTEGER DEFAULT 0,
  speaking_pct INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS levels (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE, -- A1, A2, B1, B2
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  locked INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS units (
  id SERIAL PRIMARY KEY,
  level_id INTEGER NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'green',
  icon TEXT NOT NULL DEFAULT 'book',
  order_index INTEGER NOT NULL,
  locked INTEGER NOT NULL DEFAULT 0,
  date_label TEXT,
  -- "Ruscha tomosha": mashqlar tugatilgach ochiladigan haqiqiy ruscha film,
  -- multfilm, hujjatli film yoki intervyudan 5-10 daqiqalik parcha (YouTube).
  -- clip_url NULL bo'lsa, bu bo'lim ko'rsatilmaydi. clip_start/clip_end —
  -- parchaning boshi va oxiri (soniyalarda).
  clip_url TEXT,
  clip_title TEXT,
  clip_kind TEXT CHECK (clip_kind IN ('film', 'multfilm', 'hujjatli', 'intervyu')),
  clip_start INTEGER,
  clip_end INTEGER
);

CREATE TABLE IF NOT EXISTS vocabulary_rounds (
  id SERIAL PRIMARY KEY,
  unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS vocabulary_words (
  id SERIAL PRIMARY KEY,
  round_id INTEGER NOT NULL REFERENCES vocabulary_rounds(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL DEFAULT '📘',
  word TEXT NOT NULL,
  transcription TEXT NOT NULL,
  part_of_speech TEXT NOT NULL,
  translation_uz TEXT NOT NULL,
  definition TEXT NOT NULL,
  example_sentence TEXT NOT NULL DEFAULT '',
  example_translation TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS user_word_progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  word_id INTEGER NOT NULL REFERENCES vocabulary_words(id) ON DELETE CASCADE,
  learned INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, word_id)
);

-- So'zni tekshirishning 4 bosqichi: imlo (spelling), ta'rif (definition),
-- talaffuz (pronunciation), gap ichida (sentence). Har biri alohida
-- o'tilgan/o'tilmaganligi shu yerda saqlanadi.
CREATE TABLE IF NOT EXISTS user_word_stage_progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  word_id INTEGER NOT NULL REFERENCES vocabulary_words(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  passed INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, word_id, stage)
);

CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  skill_label TEXT NOT NULL DEFAULT 'Ko''nikma',
  order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS exercise_questions (
  id SERIAL PRIMARY KEY,
  exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  options_json TEXT NOT NULL,
  correct_index INTEGER NOT NULL,
  order_index INTEGER NOT NULL,
  -- Tinglash savoli: ochilganda shu matn ovoz chiqarib o'qiladi.
  audio_text TEXT,
  -- Yozish savoli: to'g'ri javob(lar), "|" bilan ajratilgan. Bunda
  -- options_json bo'sh massiv bo'ladi.
  answer_text TEXT,
  -- Javobdan keyin ko'rsatiladigan qisqa izoh.
  explanation TEXT
);

CREATE TABLE IF NOT EXISTS user_exercise_progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  score_pct INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, exercise_id)
);

CREATE TABLE IF NOT EXISTS user_unit_progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  percent INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, unit_id)
);

CREATE TABLE IF NOT EXISTS marks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unit_id INTEGER REFERENCES units(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL DEFAULT 100,
  date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ranking_entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scope TEXT NOT NULL, -- 'branch' | 'group'
  display_name TEXT NOT NULL,
  points INTEGER NOT NULL,
  place INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS extra_lessons (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  teacher TEXT NOT NULL,
  date_label TEXT NOT NULL,
  time_label TEXT NOT NULL,
  seats_total INTEGER NOT NULL DEFAULT 10,
  seats_taken INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS extra_lesson_bookings (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  extra_lesson_id INTEGER NOT NULL REFERENCES extra_lessons(id) ON DELETE CASCADE,
  booked_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, extra_lesson_id)
);
