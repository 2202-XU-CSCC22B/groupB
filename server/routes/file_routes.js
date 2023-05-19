const express = require("express");
const File = require("../models/file_model");
const app = express();
const multer = require("multer");

const upload = multer(); // Create an instance of multer

app.post('/file/upload/:passId', upload.single('file'), async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;
        const passId = req.params.passId;

        // Create a new file document
        const file = new File({
            filename: originalname,
            data: buffer,
            contentType: mimetype,
            pass: passId, // Set the pass ID for the file
        });

        // Save the file document to the database
        await file.save();

        // Update the `reqs_uploaded` field in the pass model to true
        await Pass.updateOne({ _id: passId }, { reqs_uploaded: true });

        res.send(`File uploaded successfully to ${passId}`);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('File upload failed');
    }
});

module.exports = app;
