# API de Videos, Categorías y Banners

Esta es una API construida con Express.js que proporciona endpoints para gestionar videos, categorías y banners. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en estos recursos.

## Tecnologías utilizadas

- Node.js
- Express.js
- Cors
- fs (File System)

## Instalación

1. Clona el repositorio:
    ```
    git clone https://github.com/shmariajesus/aluraflix-api.git
    ```

1. Navega al directorio del proyecto:
    ```
    cd aluraflix-api
    ```

2. Instala las dependencias usando npm:
    ```
    npm install
    ```

## Uso

1. Para iniciar el servidor, ejecuta:
    ```
    node server.js
    ```

2. La API estará disponible en 
- `http://localhost:3001/videos`
- `http://localhost:3001/categories`
- `http://localhost:3001/banners`

El servidor se ejecutará en el puerto 3001.

## Endpoints

### Videos

- `GET /videos` - Obtiene todos los videos.
- `POST /videos` - Crea un nuevo video.
    - Body:
      ```json
      {
        "title": "string",
        "category": "string",
        "photo": "string",
        "link": "string",
        "description": "string"
      }
      ```
- `PUT /videos/:id` - Actualiza un video existente.
    - Body:
      ```json
      {
        "title": "string",
        "category": "string",
        "photo": "string",
        "link": "string",
        "description": "string"
      }
      ```
- `DELETE /videos/:id` - Elimina un video.

### Categorías

- `GET /categories` - Obtiene todas las categorías.
- `POST /categories` - Crea una nueva categoría.
    - Body:
      ```json
      {
        "name": "string",
        "style": "string"
      }
      ```
- `PUT /categories/:id` - Actualiza una categoría existente.
    - Body:
      ```json
      {
        "name": "string",
        "style": "string"
      }
      ```
- `DELETE /categories/:id` - Elimina una categoría.

### Banners

- `GET /banners` - Obtiene todos los banners.
- `POST /banners` - Crea un nuevo banner.
    - Body:
      ```json
      {
        "title": "string",
        "category": "string",
        "photo": "string",
        "link": "string",
        "description": "string"
      }
      ```
- `PUT /banners/:id` - Actualiza un banner existente.
    - Body:
      ```json
      {
        "title": "string",
        "category": "string",
        "photo": "string",
        "link": "string",
        "description": "string"
      }
      ```
- `DELETE /banners/:id` - Elimina un banner.

## Estructura de Archivos

```
aluraflix-api/
├── database/
│   └── db.json
├── README.md
├── server.js
└── vercel.json
```

## Notas

- En modo desarrollo, la ruta de trabajo para la base de datos es `database/db.json`.
- En modo producción, la ruta de trabajo para la base de datos es `/tmp/db.json`.