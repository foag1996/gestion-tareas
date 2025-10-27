# TaskFlow API - Documentación Completa

## Información General

**Base URL:** `http://localhost:5000/api`

**Formato de respuesta:** JSON

**Autenticación:** JWT Bearer Token

---

## Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Usuarios](#usuarios)
3. [Tareas](#tareas)
4. [Códigos de Estado](#códigos-de-estado)
5. [Manejo de Errores](#manejo-de-errores)
6. [Ejemplos con cURL](#ejemplos-con-curl)

---

## Autenticación

Todos los endpoints de tareas y el perfil de usuario requieren autenticación mediante JWT token.

### Formato del Header de Autenticación

```
Authorization: Bearer {your_jwt_token}
```

### Obtención del Token

El token se obtiene al registrarse o iniciar sesión exitosamente.

---

## Endpoints

### 1. Registro de Usuario

Crea una nueva cuenta de usuario.

**Endpoint:** `POST /auth/register`

**Requiere autenticación:** No

**Body (JSON):**
```json
{
  "name": "string (requerido, mín 1 carácter)",
  "email": "string (requerido, formato email válido)",
  "password": "string (requerido, mín 6 caracteres)"
}
```

**Ejemplo de Request:**
```json
{
  "name": "María García",
  "email": "maria@example.com",
  "password": "securepass123"
}
```

**Respuesta exitosa (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 5,
    "name": "María García",
    "email": "maria@example.com"
  }
}
```

**Errores posibles:**
- `400` - Campos faltantes o inválidos
- `400` - Email ya registrado
- `400` - Contraseña muy corta
- `500` - Error del servidor

---

### 2. Inicio de Sesión

Autentica un usuario existente.

**Endpoint:** `POST /auth/login`

**Requiere autenticación:** No

**Body (JSON):**
```json
{
  "email": "string (requerido)",
  "password": "string (requerido)"
}
```

**Ejemplo de Request:**
```json
{
  "email": "maria@example.com",
  "password": "securepass123"
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 5,
    "name": "María García",
    "email": "maria@example.com"
  }
}
```

**Errores posibles:**
- `400` - Email o contraseña faltantes
- `401` - Credenciales inválidas
- `500` - Error del servidor

---

### 3. Obtener Perfil de Usuario

Obtiene la información del usuario autenticado.

**Endpoint:** `GET /auth/profile`

**Requiere autenticación:** Sí

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": 5,
    "name": "María García",
    "email": "maria@example.com",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errores posibles:**
- `401` - Token no proporcionado o inválido
- `404` - Usuario no encontrado
- `500` - Error del servidor

---

### 4. Crear Tarea

Crea una nueva tarea para el usuario autenticado.

**Endpoint:** `POST /tasks`

**Requiere autenticación:** Sí

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "string (requerido, mín 1 carácter)",
  "description": "string (opcional)",
  "priority": "string (opcional, valores: 'baja', 'media', 'alta', default: 'media')"
}
```

**Ejemplo de Request:**
```json
{
  "title": "Implementar sistema de notificaciones",
  "description": "Crear sistema que envíe emails automáticos a los usuarios",
  "priority": "alta"
}
```

**Respuesta exitosa (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully.",
  "task": {
    "id": 15,
    "title": "Implementar sistema de notificaciones",
    "description": "Crear sistema que envíe emails automáticos a los usuarios",
    "priority": "alta",
    "status": "por_hacer",
    "user_id": 5
  }
}
```

**Errores posibles:**
- `400` - Título faltante
- `400` - Prioridad inválida
- `401` - No autenticado
- `500` - Error del servidor

---

### 5. Obtener Tareas

Obtiene todas las tareas del usuario autenticado, con opción de filtrar por estado.

**Endpoint:** `GET /tasks`

**Requiere autenticación:** Sí

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters (opcionales):**
- `status` - Filtrar por estado: `por_hacer`, `en_progreso`, o `completada`

**Ejemplos de Request:**
```
GET /tasks
GET /tasks?status=por_hacer
GET /tasks?status=en_progreso
```

**Respuesta exitosa (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "tasks": [
    {
      "id": 15,
      "user_id": 5,
      "title": "Implementar sistema de notificaciones",
      "description": "Crear sistema que envíe emails automáticos",
      "priority": "alta",
      "status": "por_hacer",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 16,
      "user_id": 5,
      "title": "Diseñar logo",
      "description": "Crear logo corporativo para la empresa",
      "priority": "media",
      "status": "en_progreso",
      "created_at": "2024-01-15T11:00:00.000Z",
      "updated_at": "2024-01-15T12:00:00.000Z"
    },
    {
      "id": 17,
      "user_id": 5,
      "title": "Revisar código",
      "description": "",
      "priority": "baja",
      "status": "completada",
      "created_at": "2024-01-14T09:00:00.000Z",
      "updated_at": "2024-01-15T13:00:00.000Z"
    }
  ]
}
```

**Errores posibles:**
- `400` - Estado de filtro inválido
- `401` - No autenticado
- `500` - Error del servidor

---

### 6. Actualizar Estado de Tarea

Cambia el estado de una tarea específica.

**Endpoint:** `PATCH /tasks/:id/status`

**Requiere autenticación:** Sí

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**URL Parameters:**
- `id` - ID de la tarea (number)

**Body (JSON):**
```json
{
  "status": "string (requerido, valores: 'por_hacer', 'en_progreso', 'completada')"
}
```

**Ejemplo de Request:**
```
PATCH /tasks/15/status

Body:
{
  "status": "en_progreso"
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Task status updated successfully.",
  "task": {
    "id": 15,
    "user_id": 5,
    "title": "Implementar sistema de notificaciones",
    "description": "Crear sistema que envíe emails automáticos",
    "priority": "alta",
    "status": "en_progreso",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T14:30:00.000Z"
  }
}
```

**Errores posibles:**
- `400` - Estado inválido
- `401` - No autenticado
- `404` - Tarea no encontrada o no pertenece al usuario
- `500` - Error del servidor

---

### 7. Eliminar Tarea

Elimina permanentemente una tarea.

**Endpoint:** `DELETE /tasks/:id`

**Requiere autenticación:** Sí

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id` - ID de la tarea (number)

**Ejemplo de Request:**
```
DELETE /tasks/15
```

**Respuesta exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully."
}
```

**Errores posibles:**
- `401` - No autenticado
- `404` - Tarea no encontrada o no pertenece al usuario
- `500` - Error del servidor

---

## Códigos de Estado

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Solicitud exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Datos de entrada inválidos |
| 401 | Unauthorized | No autenticado o token inválido |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## Manejo de Errores

Todas las respuestas de error siguen este formato:

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

### Ejemplos de Errores Comunes

**Validación:**
```json
{
  "success": false,
  "message": "Please provide email and password."
}
```

**Autenticación:**
```json
{
  "success": false,
  "message": "Invalid token."
}
```

**No encontrado:**
```json
{
  "success": false,
  "message": "Task not found or you do not have permission."
}
```

**Token expirado:**
```json
{
  "success": false,
  "message": "Token expired."
}
```

---

## Valores Válidos

### Prioridades de Tarea
- `baja` - Prioridad baja
- `media` - Prioridad media (default)
- `alta` - Prioridad alta

### Estados de Tarea
- `por_hacer` - Tarea pendiente (default al crear)
- `en_progreso` - Tarea en desarrollo
- `completada` - Tarea finalizada

---

## Ejemplos con cURL

### 1. Registro
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### 3. Obtener Perfil
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Crear Tarea
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nueva tarea",
    "description": "Descripción de la tarea",
    "priority": "alta"
  }'
```

### 5. Obtener Tareas
```bash
# Todas las tareas
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Filtrar por estado
curl -X GET "http://localhost:5000/api/tasks?status=por_hacer" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Actualizar Estado
```bash
curl -X PATCH http://localhost:5000/api/tasks/1/status \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "en_progreso"
  }'
```

### 7. Eliminar Tarea
```bash
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Ejemplos con JavaScript (Axios)

### Configuración Base
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Agregar token a todas las peticiones
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Registro
```javascript
const register = async (name, email, password) => {
  const response = await api.post('/auth/register', {
    name, email, password
  });
  return response.data;
};
```

### Login
```javascript
const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email, password
  });
  return response.data;
};
```

### Crear Tarea
```javascript
const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};
```

### Obtener Tareas
```javascript
const getTasks = async (status = null) => {
  const params = status ? { status } : {};
  const response = await api.get('/tasks', { params });
  return response.data;
};
```

---

## Notas Importantes

1. **Tokens JWT**: Los tokens expiran en 24 horas. Después de eso, el usuario debe iniciar sesión nuevamente.

2. **Seguridad**: Las contraseñas se hashean con bcrypt usando 10 salt rounds antes de almacenarse.

3. **CORS**: El backend acepta peticiones desde cualquier origen. En producción, configura CORS apropiadamente.

4. **Rate Limiting**: Actualmente no hay límite de peticiones. Considera implementarlo en producción.

5. **Paginación**: Los endpoints de listado no tienen paginación. Considera agregarla si esperas muchos registros.

6. **Validación**: Toda la validación de datos se realiza en el backend, pero es recomendable también validar en el frontend.

---

## Changelog

### v1.0.0 (2024-01-15)
- Lanzamiento inicial
- CRUD completo de tareas
- Sistema de autenticación JWT
- Filtrado de tareas por estado
- Sistema de prioridades

---

**Documentación generada para TaskFlow API v1.0.0**
