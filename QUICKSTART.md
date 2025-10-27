# Guía de Inicio Rápido - TaskFlow

## ⚡ Instalación en 5 Minutos

### 1️⃣ Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend (en otra terminal)
cd frontend
npm install
```

### 2️⃣ Configurar Base de Datos

```bash
# Iniciar MySQL
mysql -u root -p

# Ejecutar script (desde MySQL)
SOURCE backend/database.sql;

# O desde terminal
mysql -u root -p < backend/database.sql
```

### 3️⃣ Configurar Variables de Entorno

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edita el archivo .env con tus credenciales MySQL
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
# Ya está configurado para localhost:5000
```

### 4️⃣ Iniciar Aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5️⃣ ¡Listo!

Abre tu navegador en: **http://localhost:3000**

---

## 📝 Crear Primer Usuario

1. Ve a **http://localhost:3000/register**
2. Completa el formulario
3. ¡Automáticamente serás redirigido al dashboard!

---

## 🎯 Probar con Datos de Ejemplo

### Opción A: Usar usuario demo

```bash
# Generar hash de contraseña
cd backend
node generateHash.js

# Actualizar seedData.sql con el hash generado
# Ejecutar script
mysql -u root -p taskflow_db < seedData.sql
```

**Credenciales:**
- Email: `demo@taskflow.com`
- Contraseña: `demo123`

### Opción B: Crear cuenta nueva

Simplemente regístrate desde la interfaz web.

---

## ✅ Verificar que Todo Funciona

### Backend
```bash
curl http://localhost:5000/api/health
```

Deberías ver:
```json
{
  "success": true,
  "message": "TaskFlow API is running",
  "timestamp": "..."
}
```

### Frontend
Abre http://localhost:3000 y deberías ver la página de login.

---

## 🛠️ Comandos Útiles

### Backend
```bash
npm run dev      # Iniciar con nodemon (recarga automática)
npm start        # Iniciar en modo producción
```

### Frontend
```bash
npm start        # Iniciar en modo desarrollo
npm run build    # Crear build de producción
```

---

## 📊 Estructura de Carpetas

```
gestion-tareas/
├── backend/          → Servidor Node.js
│   ├── config/       → Configuración DB
│   ├── controllers/  → Lógica de negocio
│   ├── middleware/   → Autenticación
│   ├── routes/       → Definición de endpoints
│   └── server.js     → Punto de entrada
│
└── frontend/         → Aplicación React
    └── src/
        ├── components/  → Componentes reutilizables
        ├── context/     → Estado global
        ├── pages/       → Páginas principales
        ├── services/    → API calls
        └── styles/      → Estilos CSS
```

---

## 🚨 Problemas Comunes

### MySQL no conecta
```
Error: connect ECONNREFUSED
```
✅ **Solución:** Verifica que MySQL esté corriendo y las credenciales en `.env` sean correctas.

### Puerto 5000 ocupado
```
Error: listen EADDRINUSE
```
✅ **Solución:** Cambia el puerto en `backend/.env` y `frontend/.env`

### "Token expired"
✅ **Solución:** Cierra sesión y vuelve a iniciar sesión.

---

## 📚 Más Información

- **README.md** - Documentación completa
- **API_DOCUMENTATION.md** - Referencia de la API
- **backend/database.sql** - Esquema de base de datos

---

## 🎉 ¡Todo Listo!

Ahora puedes:
- ✅ Crear tareas
- ✅ Moverlas entre columnas (Por Hacer → En Progreso → Completada)
- ✅ Asignar prioridades (baja, media, alta)
- ✅ Eliminar tareas
- ✅ Filtrar por estado

**¡Disfruta usando TaskFlow! 🚀**
