const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(cors());

const db = new sqlite3.Database("./movies.db");

// Flexible fetch with range filters
app.get("/api/movies", (req, res) => {
  let query = `SELECT * FROM movies WHERE 1=1`;
  const params = [];

  // Year range
  if (req.query.minYear) {
    query += ` AND year >= ?`;
    params.push(parseInt(req.query.minYear));
  }

  if (req.query.maxYear) {
    query += ` AND year <= ?`;
    params.push(parseInt(req.query.maxYear));
  }

  // Runtime range
  if (req.query.minDuration) {
    query += ` AND runtime >= ?`;
    params.push(parseInt(req.query.minDuration));
  }

  if (req.query.maxDuration) {
    query += ` AND runtime <= ?`;
    params.push(parseInt(req.query.maxDuration));
  }

  // Genre filter: multiple genres accepted
  if (req.query.genre) {
    const genres = Array.isArray(req.query.genre)
      ? req.query.genre
      : [req.query.genre];
    genres.forEach((g) => {
      query += ` AND genre LIKE ?`;
      params.push(`%${g}%`);
    });
  }

  // Optional limit
  const limit = parseInt(req.query.limit) || 1000;
  query += ` LIMIT ?`;
  params.push(limit);

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Search by title
app.get("/api/movies/search", (req, res) => {
  const title = req.query.title || "";
  const query = `SELECT * FROM movies WHERE title LIKE ? LIMIT 50`;
  db.all(query, [`%${title}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Top movies by IMDb
app.get("/api/movies/sorted/imdb", (req, res) => {
  const query = `SELECT * FROM movies ORDER BY imdb_score DESC LIMIT 1000`;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
