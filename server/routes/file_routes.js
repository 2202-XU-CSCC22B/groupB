const express = require("express");
const File = require("../models/file_model");
const app = express();
const multer = require("multer");

const upload = multer(); // Create an instance of multer

app.post('/file/upload', upload.single('file'), async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;

        // Create a new file document
        const file = new File({
        filename: originalname,
        data: buffer,
        contentType: mimetype
        });

        // Save the file document to the database
        await file.save();

        res.send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('File upload failed');
    }
});

module.exports = app;