-- Bharat Krishi AI Database Schema

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100),
  phone      VARCHAR(15),
  state      VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS predictions (
  id           SERIAL PRIMARY KEY,
  user_id      INT REFERENCES users(id),
  module       VARCHAR(50),
  input_data   JSONB,
  result       JSONB,
  created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schemes (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(200),
  description  TEXT,
  state        VARCHAR(50),
  crop_type    VARCHAR(100),
  category     VARCHAR(50),
  link         TEXT
);

CREATE TABLE IF NOT EXISTS market_prices (
  id           SERIAL PRIMARY KEY,
  commodity    VARCHAR(100),
  state        VARCHAR(50),
  mandi        VARCHAR(100),
  modal_price  FLOAT,
  min_price    FLOAT,
  max_price    FLOAT,
  recorded_at  DATE
);
