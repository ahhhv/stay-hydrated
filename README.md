# Stay Hydrated - Water Tracker App

Una aplicación web simple y elegante para hacer seguimiento de tu consumo diario de agua.

## Características

- 💧 Seguimiento de consumo de agua en tiempo real
- 🎯 Establecimiento de objetivos diarios personalizables
- 📊 Barra de progreso visual
- 🌍 Soporte multiidioma (Español, Inglés, Catalán)
- 🌙 Modo oscuro/claro
- 📱 Diseño responsive
- 💾 Almacenamiento local de datos

## 🚀 Quick Start (Recomendado)

La forma más rápida de probar la aplicación:

```bash
# Opción 1: Docker Compose (más fácil)
curl -O https://raw.githubusercontent.com/ahhhv/stay-hydrated/main/docker-compose.yml
docker-compose up -d

# Opción 2: Docker directo
docker run -d -p 8080:80 --name stay-hydrated wandish/stay-hydrated:latest
```

**🌐 Acceso:** http://localhost:8080

## 📦 Deployment Options

### 🐳 Docker Compose (Recomendado)

**Para producción:**
```bash
git clone https://github.com/ahhhv/stay-hydrated.git
cd stay-hydrated
docker-compose up -d
```

**Para desarrollo local:**
```bash
# Usar imagen de Docker Hub (sin build)
docker-compose up -d

# O para desarrollo con hot reload
docker-compose --profile dev up stay-hydrated-dev -d
```

### 🔧 Docker Manual

**Usando imagen pre-construida:**
```bash
docker run -d \
  --name stay-hydrated \
  -p 8080:80 \
  --restart unless-stopped \
  wandish/stay-hydrated:latest
```

**Construir localmente:**
```bash
git clone https://github.com/ahhhv/stay-hydrated.git
cd stay-hydrated
docker build -t stay-hydrated .
docker run -d -p 8080:80 --name stay-hydrated stay-hydrated
```

## 🧪 Testing y Verificación

### Verificar que la aplicación funciona:

1. **Accede a la aplicación:** http://localhost:8080
2. **Prueba las funcionalidades:**
   - ✅ Agregar agua (botones +250ml, +500ml, +1L)
   - ✅ Cambiar objetivo diario
   - ✅ Cambiar idioma (ES/EN/CA)
   - ✅ Alternar modo oscuro/claro
   - ✅ Verificar que el progreso se guarda al recargar

### Comandos útiles:

```bash
# Ver logs del contenedor
docker logs stay-hydrated

# Verificar que el contenedor está corriendo
docker ps

# Parar la aplicación
docker stop stay-hydrated

# Reiniciar la aplicación
docker restart stay-hydrated

# Eliminar completamente
docker rm -f stay-hydrated
```

## 💻 Desarrollo Local

Para desarrollo local, simplemente abre `index.html` en tu navegador o usa un servidor web simple:

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node.js (si tienes npx)
npx serve .

# Opción 3: PHP
php -S localhost:8000
```

**Acceso:** http://localhost:8000

## 🔧 Troubleshooting

### Problemas comunes:

**❌ "Cannot connect to the Docker daemon"**
```bash
# En macOS/Windows: Asegúrate de que Docker Desktop esté ejecutándose
open -a Docker  # macOS
# O inicia Docker Desktop manualmente
```

**❌ "Port 8080 is already in use"**
```bash
# Usar un puerto diferente
docker run -d -p 8081:80 --name stay-hydrated wandish/stay-hydrated:latest
# Acceso: http://localhost:8081
```

**❌ "Container name already exists"**
```bash
# Eliminar contenedor existente
docker rm -f stay-hydrated
# Luego ejecutar el comando de nuevo
```

**❌ La aplicación no carga o muestra errores**
```bash
# Verificar logs del contenedor
docker logs stay-hydrated

# Reiniciar el contenedor
docker restart stay-hydrated

# Si persiste, eliminar y crear nuevo
docker rm -f stay-hydrated
docker run -d -p 8080:80 --name stay-hydrated wandish/stay-hydrated:latest
```

**❌ "docker-compose command not found"**
```bash
# Usar docker compose (sin guión) en versiones nuevas
docker compose up -d

# O instalar docker-compose
pip install docker-compose
```

### Verificar instalación:

```bash
# Verificar Docker
docker --version

# Verificar Docker Compose
docker-compose --version
# o
docker compose version
```

## 🛠️ Tecnologías

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript (ES6+)
- Font Awesome (iconos)
- Nginx (para Docker)

## Licencia

MIT License