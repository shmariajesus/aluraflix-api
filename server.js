const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const dbFilePath = path.join(__dirname, 'database', 'db.json');

// DEV
// const newDBFilePath = dbFilePath;

// PROD
const newDBFilePath = path.join('/tmp', 'db.json')

let videos = [];
let categories = [];
let banners = [];
let videosNextId = 0;
let categoriesNextId = 0;
let bannersNextId = 0;

// Leer archivo JSON de base
const loadItems = () => {
    fs.readFile(dbFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            return;    
        }

        try {
            const jsonData = JSON.parse(data);
            videos = jsonData.videos;
            categories = jsonData.categories;
            banners = jsonData.banners;

            // Calcular el próximo ID
            if (videos.length > 0) {
                videosNextId = Math.max(...videos.map(item => parseInt(item.id, 10))) + 1;
            }

            if (categories.length > 0) {
                categoriesNextId = Math.max(...categories.map(item => parseInt(item.id, 10))) + 1;
            }

            if (banners.length > 0) {
                bannersNextId = Math.max(...banners.map(item => parseInt(item.id, 10))) + 1;
            }
        } catch (err) {
            console.error('Error al leer el archivo JSON:', err);
        }
    })
};

loadItems();

const saveItems = () => {
    fs.writeFileSync(newDBFilePath, JSON.stringify({ videos, categories, banners }, null, 2));
};


// Enpoints videos
app.get('/videos', (req, res) => {
    res.json(videos);
});

app.post('/videos', (req, res) => {
    const video = req.body;

    if (!video.title || !video.category || !video.photo || !video.link || !video.description) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    video.id = String(videosNextId++);
    videos.push(video);

    try {
        saveItems();
        res.status(200).json(video);
    } catch (err) {
        console.error('Error al escribir en el archivo JSON:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put('/videos/:id', (req, res) => {
    const { id } = req.params;
    const updatedVideo = req.body;
    const index = videos.findIndex(video => video.id === id.toString());

    if (index === -1) {
        return res.status(404).json({ error: 'Video no encontrado' });
    }

    videos[index] = { ...videos[index], ...updatedVideo };

    try {
        saveItems();
        res.status(200).json(videos[index]);
    } catch (err) {
        console.error('Error al guardar el archivo JSON:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/videos/:id', (req, res) => {
    const { id } = req.params;
    videos = videos.filter(video => video.id !== id.toString());

    try {
        saveItems();
        res.status(200).json({ message: 'Video eliminado' });
    } catch (err) {
        console.error('Error al guardar el archivo JSON:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Enpoints categories
app.get('/categories', (req, res) => {
    res.json(categories);
});

app.post('/categories', (req, res) => {
    const category = req.body;

    if (!category.name || !category.style) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    category.id = String(categoriesNextId++);
    categories.push(category);

    try {
        saveItems();
        res.status(200).json(category);
    } catch (err) {
        console.error('Error al escribir en el archivo JSON:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const updatedCategory = req.body;
    const index = categories.findIndex(category => category.id === id.toString());

    if (index === -1) {
        return res.status(404).json({ error: 'Video no encontrado' });
    }

    categories[index] = { ...categories[index], ...updatedCategory };

    try {
        saveItems();
        res.status(200).json(categories[index]);
    } catch (err) {
        console.error('Error al guardar el archivo JSON:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    categories = categories.filter(category => category.id !== id.toString());

    try {
        saveItems();
        res.status(200).json({ message: 'Categoria eliminada' });
    } catch (err) {
        console.error('Error al guardar el archivo JSON:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoints banners
app.get('/banners', (req, res) => {
    res.json(banners);
});

app.post('/banners', (req, res) => {
    const banner = req.body;

    if (!banner.title || !banner.category || !banner.photo || !banner.link || !banner.description) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    banner.id = String(bannersNextId++);
    banners.push(banner);
    saveItems();
    res.status(201).json(banner);
});

app.put('/banners/:id', (req, res) => {
    const { id } = req.params;
    const updatedBanner = req.body;
    const index = banners.findIndex(banner => banner.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Banner no encontrado' });
    }

    banners[index] = { ...banners[index], ...updatedBanner };

    try {
        saveItems();
        res.status(200).json(banners[index]);
    } catch (err) {
        console.error('Error al guardar el archivo JSON:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/banners/:id', (req, res) => {
    const { id } = req.params;
    banners = banners.filter(banner => banner.id !== id);

    try {
        saveItems();
        res.status(200).json({ message: 'Banner eliminado' });
    } catch (err) {
        console.error('Error al guardar el archivo JSON:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Sirviendo en puerto: ${PORT}`);
});

module.exports = app