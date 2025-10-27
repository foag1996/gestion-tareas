-- Script para insertar datos de prueba
-- Asegúrate de que la base de datos y las tablas ya estén creadas

USE tarea;

-- Eliminar datos existentes (opcional)
-- DELETE FROM tasks;
-- DELETE FROM users;

-- Insertar usuario de prueba
-- Contraseña: demo123 (hasheada con bcrypt)
INSERT INTO users (name, email, password) VALUES
('Usuario Demo', 'demo@taskflow.com', '$2b$10$YQZJq9GqVZ7lkKzB7GvZLO5eQXqOqH9KJOqzKqz9hKzB7GvZLO5eQ');

-- Obtener el ID del usuario recién insertado
SET @user_id = LAST_INSERT_ID();

-- Insertar 5 tareas de ejemplo
INSERT INTO tasks (user_id, title, description, priority, status) VALUES
(@user_id, 'Implementar autenticación', 'Configurar JWT y bcrypt para el sistema de autenticación', 'alta', 'completada'),
(@user_id, 'Diseñar interfaz de usuario', 'Crear mockups para las pantallas principales de la aplicación', 'media', 'en_progreso'),
(@user_id, 'Configurar base de datos', 'Crear esquema de base de datos MySQL y tablas necesarias', 'alta', 'completada'),
(@user_id, 'Escribir documentación', 'Documentar la API y crear guía de instalación', 'baja', 'por_hacer'),
(@user_id, 'Realizar pruebas', 'Ejecutar pruebas end-to-end y corregir bugs encontrados', 'media', 'por_hacer');

-- Verificar los datos insertados
SELECT 'Usuarios creados:' as info;
SELECT id, name, email, created_at FROM users WHERE email = 'demo@taskflow.com';

SELECT '\nTareas creadas:' as info;
SELECT id, title, priority, status, created_at FROM tasks WHERE user_id = @user_id;

-- Información importante
SELECT '\n=== INFORMACIÓN IMPORTANTE ===' as info;
SELECT 'Email: demo@taskflow.com' as info;
SELECT 'Contraseña: demo123' as info;
SELECT 'NOTA: Si ya existe un usuario con este email, este script fallará.' as info;
SELECT 'En ese caso, usa el usuario existente o cambia el email en el script.' as info;
