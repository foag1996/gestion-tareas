# TaskFlow - Sistema de Gestión de Tareas

TaskFlow es una aplicación web full-stack para gestionar tareas personales de forma eficiente, con un tablero tipo Kanban que organiza las tareas en tres estados: "Por hacer", "En progreso" y "Completada".

## 📋 Descripción

Aplicación MVP que permite a los usuarios:
- Registrarse e iniciar sesión de forma segura
- Crear y gestionar tareas personales
- Organizar tareas en un tablero Kanban
- Filtrar tareas por estado
- Asignar prioridades (alta, media, baja)
- Eliminar tareas completadas

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MySQL** - Base de datos relacional
- **bcrypt** - Hash de contraseñas
- **jsonwebtoken (JWT)** - Autenticación
- **express-validator** - Validación de datos
- **cors** - Configuración CORS
- **dotenv** - Variables de entorno

### Frontend
- **React 18** - Librería UI
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Context API** - Gestión de estado global
- **CSS3** - Estilos (responsive design)

### Base de Datos
- **MySQL** - Sistema de gestión de base de datos

## 📁 Estructura del Proyecto

```
gestion-tareas/
├── backend/
│   ├── config/
│   │   └── database.js          # Configuración MySQL
│   ├── controllers/
│   │   ├── authController.js    # Lógica de autenticación
│   │   └── taskController.js    # Lógica de tareas
│   ├── middleware/
│   │   └── auth.js              # Middleware JWT
│   ├── routes/
│   │   ├── authRoutes.js        # Rutas de autenticación
│   │   └── taskRoutes.js        # Rutas de tareas
│   ├── .env.example             # Ejemplo de variables de entorno
│   ├── database.sql             # Script de creación de BD
│   ├── seedData.sql             # Datos de prueba
│   ├── generateHash.js          # Generador de hash bcrypt
│   ├── package.json
│   └── server.js                # Punto de entrada
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── PrivateRoute.js  # Protección de rutas
│   │   │   ├── TaskBoard.js     # Tablero Kanban
│   │   │   ├── TaskCard.js      # Tarjeta de tarea
│   │   │   └── TaskModal.js     # Modal crear tarea
│   │   ├── context/
│   │   │   └── AuthContext.js   # Contexto de autenticación
│   │   ├── pages/
│   │   │   ├── Login.js         # Página de login
│   │   │   ├── Register.js      # Página de registro
│   │   │   └── Dashboard.js     # Página principal
│   │   ├── services/
│   │   │   └── api.js           # Configuración Axios
│   │   ├── styles/              # Archivos CSS
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Instalación

### Requisitos Previos

- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- npm o yarn

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd gestion-tareas
```

### 2. Configurar Base de Datos

1. Inicia MySQL:
```bash
mysql -u root -p
```

2. Ejecuta el script de creación:
```bash
mysql -u root -p < backend/database.sql
```

O desde MySQL:
```sql
SOURCE backend/database.sql;
```

### 3. Configurar Backend

1. Navega a la carpeta backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea el archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Edita `.env` con tus configuraciones:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=taskflow_db

JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=24h
```

### 4. Configurar Frontend

1. Navega a la carpeta frontend:
```bash
cd ../frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea el archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. El contenido debe ser:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## ▶️ Ejecutar la Aplicación

### Iniciar Backend

Desde la carpeta `backend`:

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en: `http://localhost:5000`

### Iniciar Frontend

Desde la carpeta `frontend`:

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:3000`

## 📊 Datos de Prueba

### Opción 1: Usar el Script SQL

1. Genera un hash de contraseña:
```bash
cd backend
node generateHash.js
```

2. Copia el hash generado y actualiza `seedData.sql`

3. Ejecuta el script:
```bash
mysql -u root -p taskflow_db < seedData.sql
```

### Opción 2: Registro Manual

1. Abre `http://localhost:3000/register`
2. Crea una cuenta nueva
3. El sistema creará automáticamente el usuario

### Credenciales de Prueba (si usaste el script SQL)

```
Email: demo@taskflow.com
Contraseña: demo123
```

El script SQL incluye 5 tareas de ejemplo:
1. Implementar autenticación (Alta - Completada)
2. Diseñar interfaz de usuario (Media - En Progreso)
3. Configurar base de datos (Alta - Completada)
4. Escribir documentación (Baja - Por Hacer)
5. Realizar pruebas (Media - Por Hacer)

## 📡 Documentación de la API

### Base URL
```
http://localhost:5000/api
```

### Endpoints de Autenticación

#### 1. Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

#### 2. Inicio de Sesión
```http
POST /auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

#### 3. Obtener Perfil (Requiere autenticación)
```http
GET /auth/profile
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### Endpoints de Tareas (Todos requieren autenticación)

#### 4. Crear Tarea
```http
POST /tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Implementar nueva funcionalidad",
  "description": "Agregar sistema de notificaciones",
  "priority": "alta"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Task created successfully.",
  "task": {
    "id": 1,
    "title": "Implementar nueva funcionalidad",
    "description": "Agregar sistema de notificaciones",
    "priority": "alta",
    "status": "por_hacer",
    "user_id": 1
  }
}
```

#### 5. Obtener Todas las Tareas
```http
GET /tasks
Authorization: Bearer {token}

# Opcional: Filtrar por estado
GET /tasks?status=en_progreso
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "count": 3,
  "tasks": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Implementar nueva funcionalidad",
      "description": "Agregar sistema de notificaciones",
      "priority": "alta",
      "status": "por_hacer",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 6. Actualizar Estado de Tarea
```http
PATCH /tasks/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "en_progreso"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Task status updated successfully.",
  "task": {
    "id": 1,
    "user_id": 1,
    "title": "Implementar nueva funcionalidad",
    "description": "Agregar sistema de notificaciones",
    "priority": "alta",
    "status": "en_progreso",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T11:00:00.000Z"
  }
}
```

#### 7. Eliminar Tarea
```http
DELETE /tasks/{id}
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully."
}
```

### Códigos de Estado HTTP

- `200` - OK (solicitud exitosa)
- `201` - Created (recurso creado exitosamente)
- `400` - Bad Request (datos inválidos)
- `401` - Unauthorized (no autenticado o token inválido)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error (error del servidor)

### Valores Válidos

**Prioridades:**
- `baja`
- `media`
- `alta`

**Estados:**
- `por_hacer`
- `en_progreso`
- `completada`

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ Autenticación JWT con tokens de 24h
- ✅ Middleware de autenticación en rutas protegidas
- ✅ Validación de datos en backend
- ✅ Variables de entorno para secretos
- ✅ CORS configurado
- ✅ Protección contra SQL injection (prepared statements)

## 📱 Características Responsive

La aplicación está completamente optimizada para:
- 📱 Dispositivos móviles (< 768px)
- 💻 Tablets (768px - 1200px)
- 🖥️ Escritorio (> 1200px)

## 🧪 Pruebas

### Probar Backend

1. Health check:
```bash
curl http://localhost:5000/api/health
```

2. Registro:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

3. Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Probar Frontend

1. Abre `http://localhost:3000`
2. Regístrate o inicia sesión
3. Crea tareas y muévelas entre columnas
4. Prueba las funciones de edición y eliminación

## 📝 Scripts Disponibles

### Backend
- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor con nodemon (desarrollo)
- `node generateHash.js` - Genera hash bcrypt para contraseñas

### Frontend
- `npm start` - Inicia la app en modo desarrollo
- `npm run build` - Crea build de producción
- `npm test` - Ejecuta tests

## 🐛 Solución de Problemas

### Error de conexión a MySQL
```
Error: connect ECONNREFUSED
```
**Solución:** Verifica que MySQL esté ejecutándose y las credenciales sean correctas en `.env`

### Error "Token expired"
**Solución:** El token JWT expiró. Cierra sesión y vuelve a iniciar sesión.

### Error CORS en frontend
**Solución:** Verifica que el backend esté ejecutándose en el puerto 5000 y que CORS esté configurado.

### Tareas no se cargan
**Solución:** Abre las herramientas de desarrollo del navegador (F12) y verifica la consola. Asegúrate de que el token JWT sea válido.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado como ejercicio práctico de desarrollo full-stack.

## 📞 Soporte

Si tienes problemas o preguntas, abre un issue en el repositorio.

---

**¡Gracias por usar TaskFlow! 🚀**
