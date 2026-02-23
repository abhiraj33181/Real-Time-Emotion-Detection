const express = require("express");
const multer = require('multer');
const router = express.Router();
const uploadFile = require('../services/storage.services');
const song = require('../models/song.model');

const upload = multer({ storage : multer.memoryStorage()})

router.post('/songs', upload.single('audio'), async (req, res) => {
    const {title, artist, mood} = req.body;
    const upload = await uploadFile(req.file);
    const newSong = await song.create({
        title,
        artist,
        mood,
        audio: upload.url
    })
    res.status(201).json({ message: 'Song created successfully', newSong });
})

router.get('/songs', async (req, res) => {
    const {mood} = req.query;
    const songs = await song.find(mood ? {mood} : 'happy');  
    res.json(songs);
})

module.exports = router;