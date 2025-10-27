# 📖 Instrucciones Completas - TaskFlow

## Sistema de Gestión de Tareas - MVP Full-Stack

Este documento contiene las instrucciones paso a paso para ejecutar el proyecto completo desde cero.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación Completa](#instalación-completa)
3. [Configuración de Base de Datos](#configuración-de-base-de-datos)
4. [Configuración del Backend](#configuración-del-backend)
5. [Configuración del Frontend](#configuración-del-frontend)
6. [Ejecución del Proyecto](#ejecución-del-proyecto)
7. [Agregar Datos de Prueba](#agregar-datos-de-prueba)
8. [Verificación](#verificación)
9. [Uso de la Aplicación](#uso-de-la-aplicación)

---

## 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v14 o superior → [Descargar](https://nodejs.org/)
- **MySQL** v5.7 o superior → [Descargar](https://dev.mysql.com/downloads/)
- **Git** (opcional) → [Descargar](https://git-scm.com/)
- Un editor de código (VS Code recomendado)

### Verificar instalaciones:

```bash
node --version    # Debe mostrar v14.x o superior
npm --version     # Debe mostrar 6.x o superior
mysql --version   # Debe mostrar versión de MySQL
```

---

## 2. Instalación Completa

### Paso 1: Clonar o descargar el proyecto

Si tienes Git:
```bash
git clone <url-del-repositorio>
cd gestion-tareas
```

O simplemente descarga y extrae el archivo ZIP.

### Paso 2: Instalar dependencias del Backend

```bash
cd backend
npm install
```

Esto instalará:
- express
- mysql2
- bcrypt
- jsonwebtoken
- dotenv
- cors
- express-validator
- nodemon (dev)

### Paso 3: Instalar dependencias del Frontend

Abre una nueva terminal:

```bash
cd frontend
npm install
```

Esto instalará:
- react
- react-dom
- react-router-dom
- axios
- react-scripts

---

## 3. Configuración de Base de Datos

### Paso 1: Iniciar MySQL

**En Windows:**
```bash
# Desde servicios o CMD
net start MySQL80
```

**En macOS/Linux:**
```bash
sudo systemctl start mysql
# o
sudo service mysql start
```

### Paso 2: Conectar a MySQL

```bash
mysql -u root -p
```

Ingresa tu contraseña de root de MySQL.

### Paso 3: Ejecutar script de creación

**Opción A - Desde MySQL:**
```sql
SOURCE C:/ruta/completa/al/proyecto/backend/database.sql;
```

**Opción B - Desde terminal:**
```bash
mysql -u root -p < backend/database.sql
```

### Paso 4: Verificar creación

```sql
USE taskflow_db;
SHOW TABLES;
```

Deberías ver:
- `users`
- `tasks`

### Paso 5: Verificar estructura de tablas

```sql
DESCRIBE users;
DESCRIBE tasks;
```

---

## 4. Configuración del Backend

### Paso 1: Crear archivo .env

```bash
cd backend
cp .env.example .env
```

En Windows (si cp no funciona):
```bash
copy .env.example .env
```

### Paso 2: Editar archivo .env

Abre `backend/.env` en tu editor y configura:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_PASSWORD_MYSQL_AQUI
DB_NAME=taskflow_db

# JWT Configuration
JWT_SECRET=clave_secreta_super_segura_cambiala_en_produccion
JWT_EXPIRES_IN=24h
```

**⚠️ IMPORTANTE:** Cambia `DB_PASSWORD` con tu contraseña real de MySQL.

### Paso 3: Verificar conexión

```bash
cd backend
npm run dev
```

Deberías ver:
```
✓ Database connected successfully
🚀 Server running on port 5000
📡 API URL: http://localhost:5000/api
🏥 Health check: http://localhost:5000/api/health
```

Si ves esto, ¡el backend está funcionando! Déjalo corriendo.

---

## 5. Configuración del Frontend

### Paso 1: Crear archivo .env

Abre una NUEVA terminal:

```bash
cd frontend
cp .env.example .env
```

En Windows:
```bash
copy .env.example .env
```

### Paso 2: Verificar configuración

Abre `frontend/.env` y verifica:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Este archivo ya debería estar correcto.

---

## 6. Ejecución del Proyecto

### Necesitarás 2 terminales abiertas:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Salida esperada:
```
[nodemon] starting `node server.js`
✓ Database connected successfully
🚀 Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Salida esperada:
```
Compiled successfully!

You can now view taskflow-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

Tu navegador debería abrirse automáticamente en `http://localhost:3000`

---

## 7. Agregar Datos de Prueba

Tienes 2 opciones:

### Opción A: Usuario Demo (Recomendado)

**Paso 1:** Generar hash de contraseña
```bash
cd backend
node generateHash.js
```

**Paso 2:** Copiar el hash generado

**Paso 3:** Editar `backend/seedData.sql`

Busca esta línea:
```sql
INSERT INTO users (name, email, password) VALUES
('Usuario Demo', 'demo@taskflow.com', '$2b$10$YQZJq9GqVZ7...');
```

Reemplaza el hash con el que generaste.

**Paso 4:** Ejecutar script
```bash
mysql -u root -p taskflow_db < backend/seedData.sql
```

**Paso 5:** Iniciar sesión con:
- Email: `demo@taskflow.com`
- Contraseña: `demo123`

### Opción B: Crear Usuario Nuevo (Más Fácil)

1. Ve a `http://localhost:3000/register`
2. Completa el formulario
3. Haz clic en "Registrarse"
4. ¡Listo! Serás redirigido automáticamente al dashboard

---

## 8. Verificación

### Verificar Backend (API)

**Prueba 1 - Health Check:**
```bash
curl http://localhost:5000/api/health
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "TaskFlow API is running",
  "timestamp": "2024-01-15T..."
}
```

**Prueba 2 - Registro:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

Deberías recibir un token JWT.

### Verificar Frontend

1. Abre `http://localhost:3000`
2. Deberías ver la pantalla de Login
3. El diseño debe verse bien (responsive)
4. No debe haber errores en la consola del navegador (F12)

### Verificar Base de Datos

```sql
mysql -u root -p taskflow_db

SELECT * FROM users;
SELECT * FROM tasks;
```

---

## 9. Uso de la Aplicación

### 9.1 Registro e Inicio de Sesión

1. Visita `http://localhost:3000/register`
2. Completa:
   - Nombre
   - Email
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
3. Haz clic en "Registrarse"
4. Serás redirigido automáticamente al dashboard

### 9.2 Crear Primera Tarea

1. En el dashboard, haz clic en "+ Nueva Tarea"
2. Completa:
   - **Título** (obligatorio)
   - **Descripción** (opcional)
   - **Prioridad**: Baja, Media o Alta
3. Haz clic en "Crear Tarea"
4. La tarea aparecerá en la columna "Por Hacer"

### 9.3 Mover Tareas

Puedes cambiar el estado de una tarea usando el selector en cada tarjeta:

- **Por Hacer** → Tareas pendientes
- **En Progreso** → Tareas en desarrollo
- **Completada** → Tareas finalizadas

### 9.4 Eliminar Tareas

Haz clic en la "×" en la esquina superior derecha de cualquier tarjeta.

### 9.5 Ver Tareas por Estado

Las tareas se organizan automáticamente en 3 columnas según su estado.

---

## 🎨 Características Implementadas

✅ **Autenticación Segura**
- Registro de usuarios
- Login con JWT
- Tokens que expiran en 24h
- Contraseñas hasheadas con bcrypt

✅ **Gestión de Tareas**
- Crear tareas con título, descripción y prioridad
- Ver todas las tareas en tablero Kanban
- Cambiar estado de tareas
- Eliminar tareas
- Filtrar por estado

✅ **Interfaz de Usuario**
- Diseño responsive (móvil, tablet, escritorio)
- Tablero Kanban visual
- Indicadores de prioridad por colores
- Estados de carga
- Mensajes de error/éxito

✅ **Seguridad**
- Rutas protegidas
- Validación de formularios
- Manejo de errores
- Variables de entorno
- Middleware de autenticación

---

## 🛠️ Comandos Útiles

### Backend
```bash
npm run dev      # Desarrollo con nodemon
npm start        # Producción
node generateHash.js  # Generar hash bcrypt
```

### Frontend
```bash
npm start        # Desarrollo
npm run build    # Build de producción
npm test         # Ejecutar tests
```

### Base de Datos
```bash
# Crear backup
mysqldump -u root -p taskflow_db > backup.sql

# Restaurar backup
mysql -u root -p taskflow_db < backup.sql

# Ver logs
tail -f /var/log/mysql/error.log
```

---

## 🐛 Solución de Problemas

### Problema 1: "Cannot connect to MySQL"
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solución:**
1. Verifica que MySQL esté corriendo
2. Comprueba las credenciales en `backend/.env`
3. Asegúrate de que el puerto 3306 esté abierto

### Problema 2: "Port 5000 already in use"
```
Error: listen EADDRINUSE :::5000
```
**Solución:**
1. Cambia el puerto en `backend/.env` (ej: 5001)
2. Actualiza `frontend/.env` con el nuevo puerto
3. Reinicia ambos servidores

### Problema 3: "Token expired"
**Solución:**
1. Ve a DevTools (F12)
2. Application → Local Storage
3. Elimina 'token' y 'user'
4. Recarga la página e inicia sesión nuevamente

### Problema 4: "npm install falla"
**Solución:**
1. Elimina node_modules: `rm -rf node_modules`
2. Elimina package-lock.json: `rm package-lock.json`
3. Reinstala: `npm install`

### Problema 5: Frontend no conecta con Backend
**Solución:**
1. Verifica que el backend esté corriendo en puerto 5000
2. Comprueba `frontend/.env`
3. Revisa la consola del navegador (F12) para errores CORS
4. Asegúrate de que ambos servidores estén corriendo

---

## 📚 Documentación Adicional

- **README.md** - Documentación completa del proyecto
- **API_DOCUMENTATION.md** - Referencia completa de la API
- **QUICKSTART.md** - Guía rápida de inicio

---

## 🎯 Checklist de Instalación

Marca cada paso al completarlo:

- [ ] Node.js y npm instalados
- [ ] MySQL instalado y corriendo
- [ ] Dependencias backend instaladas
- [ ] Dependencias frontend instaladas
- [ ] Base de datos creada (taskflow_db)
- [ ] Tablas creadas (users, tasks)
- [ ] Archivo backend/.env configurado
- [ ] Archivo frontend/.env configurado
- [ ] Backend corriendo en puerto 5000
- [ ] Frontend corriendo en puerto 3000
- [ ] Health check exitoso
- [ ] Usuario registrado o datos de prueba cargados
- [ ] Login exitoso
- [ ] Tarea creada exitosamente

---

## 🎉 ¡Proyecto Completo!

Si completaste todos los pasos, ahora tienes:

✅ Backend Node.js + Express funcionando
✅ Base de datos MySQL configurada
✅ Frontend React funcionando
✅ Autenticación JWT implementada
✅ CRUD de tareas completo
✅ Tablero Kanban visual
✅ Sistema responsive

**¡Felicidades! Tu sistema de gestión de tareas está listo para usar.** 🚀

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la sección "Solución de Problemas"
2. Verifica los logs en ambas terminales
3. Revisa la consola del navegador (F12)
4. Consulta la documentación adicional

---

**Desarrollado como ejercicio práctico de Full-Stack**

*Tecnologías: React + Node.js + Express + MySQL + JWT*
