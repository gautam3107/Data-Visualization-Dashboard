const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dashboardDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const DataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
});

const Data = mongoose.model('Data', DataSchema);
app.get('/api/data', async (req, res) => {
    try {
        const filters = {};
        if (req.query.endYear) filters.end_year = req.query.endYear;
        if (req.query.topic) filters.topic = req.query.topic;
        if (req.query.sector) filters.sector = req.query.sector;
        if (req.query.region) filters.region = req.query.region;
        if (req.query.pest) filters.pestle = req.query.pest;
        if (req.query.source) filters.source = req.query.source;

        const data = await Data.find(filters);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});