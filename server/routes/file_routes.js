const express = require("express");
const File = require("../models/file_model");
const PassForm = require("../models/pass_model");
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

        const pass = await PassForm.findById(passId);
        if (!pass) {
            res.status(404).send({ message: "Pass not found" });
            return;
        }

        if (!pass.reqs_uploaded) {
            pass.reqs_uploaded = true; // Set the 'done' field to true
            await pass.save();
        }

        res.send(`File uploaded successfully to ${passId}`);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('File upload failed');
    }
});

// Retrieve files associated with a specific pass ID
app.get('/files/:passId', async (req, res) => {
    try {
        const passId = req.params.passId;

        // Find files associated with the given pass ID
        const files = await File.find({ pass: passId });

        res.send(files);
    } catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Failed to retrieve files');
    }
});

module.exports = app;
