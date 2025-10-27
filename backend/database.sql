-- Create database
CREATE DATABASE IF NOT EXISTS tarea;
USE tarea;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('baja', 'media', 'alta') DEFAULT 'media',
  status ENUM('por_hacer', 'en_progreso', 'completada') DEFAULT 'por_hacer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);

-- Insert test user (password: test123)
-- Password hash for 'test123' generated with bcrypt
INSERT INTO users (name, email, password) VALUES
('Usuario Demo', 'demo@taskflow.com', '$2b$10$YourHashedPasswordHere');

-- Note: You'll need to register via the API to get a properly hashed password
-- Or use bcrypt to generate the hash

-- Insert sample tasks (update user_id after creating user)
-- These will be inserted via the API or after user creation
