const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/docs_db');
const DocumentSchema = new mongoose.Schema({
    title: String,
    content: String
});
const DocumentModel = mongoose.model('Document', DocumentSchema);
app.get('/get-documents', async (req, res) => {
    const result = await DocumentModel.find({});
    res.json(result);
});
app.post('/create-document', async (req, res) => {
    const result = await DocumentModel.create({
        title: req.body.title,
        content: req.body.content
    });
    res.json(result);
});
app.post('/update-document', async (req, res) => {
    const updated = await DocumentModel.findByIdAndUpdate(
        req.body.id,
        { content: req.body.content },
        { new: true }
    );
    res.json(updated);
});
app.listen(8002, () => {
    console.log("Сервис документов запущен");
});