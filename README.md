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

## Docker Deployment

### Construir la imagen

```bash
docker build -t stay-hydrated .
```

### Ejecutar localmente

```bash
docker run -p 8080:80 stay-hydrated
```

La aplicación estará disponible en `http://localhost:8080`

### Publicar en Docker Hub

1. **Etiquetar la imagen:**
```bash
docker tag stay-hydrated tu-usuario/stay-hydrated:latest
```

2. **Hacer login en Docker Hub:**
```bash
docker login
```

3. **Subir la imagen:**
```bash
docker push tu-usuario/stay-hydrated:latest
```

### Usar desde Docker Hub

```bash
docker run -p 8080:80 tu-usuario/stay-hydrated:latest
```

## Desarrollo Local

Para desarrollo local, simplemente abre `index.html` en tu navegador o usa un servidor web simple:

```bash
python3 -m http.server 8000
```

## Tecnologías

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript (ES6+)
- Font Awesome (iconos)
- Nginx (para Docker)

## Licencia

MIT License