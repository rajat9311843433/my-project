const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Article = require('./Article');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Replace <username>, <password>, and <dbname> with your actual MongoDB Atlas credentials
const uri = "mongodb+srv://rajatsharma382010:Rajeenakshi@task3.ugxtgpc.mongodb.net/?retryWrites=true&w=majority&appName=Task3";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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

// Get an article by id
app.get('/article/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an article by id
app.put('/article/:id/update', async (req, res) => {
  try {
    const { article, posted_by } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, { article, posted_by }, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an article by id
app.delete('/article/:id/delete', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
