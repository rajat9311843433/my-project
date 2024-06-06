const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Static file serving
app.use(express.static(__dirname));

// MongoDB Atlas URI
const uri = "mongodb+srv://rajatsharma382010:Rajeenakshi@task3.ugxtgpc.mongodb.net/?retryWrites=true&w=majority&appName=Task3";

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

connectToMongoDB();

// Article model
const Article = mongoose.model('Article', new mongoose.Schema({
  article: String,
  posted_by: String,
  posted_at: { type: Date, default: Date.now },
  last_updated_at: { type: Date, default: Date.now }
}));

// Create a new article
app.post('/article/create', async (req, res) => {
  try {
    const { article, posted_by } = req.body;
    const newArticle = new Article({ article, posted_by });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all articles
app.get('/article', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
