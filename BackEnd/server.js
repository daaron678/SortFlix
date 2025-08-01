// The backend of this web uses Node.js, Express, and SQLite.
const express = require("express"); // Express: fast and minimal web framework that simplifies routing and middleware handling
const cors = require("cors"); // CORS: allow cross-origin requests, as frontend and backend might run on different domains 
const sqlite3 = require("sqlite3").verbose(); // SQLite: working with databases

const app = express(); // initialize the Express app for building server
const PORT = 3000; // server will run on this port

app.use(cors()); // enable CORS so frontend can connect with backend

const db = new sqlite3.Database("./movies.db"); 

// this will fetch movies with optional filters: year, duration, and genre
app.get("/api/movies", (req, res) => { // req is request from client and res is response from server
  let query = `SELECT * FROM movies WHERE 1=1`; // this is referenced from SQL cheat sheet, using 'WHERE 1=1' making it easier to add on 'AND' query later
  const params = []; // parameters used for filter query

  // year query
  if (req.query.minYear) {
    query += ` AND year >= ?`;
    params.push(parseInt(req.query.minYear)); // pushing the minYear into params array, making it replacing the ? in the query above
  }

  if (req.query.maxYear) {
    query += ` AND year <= ?`;
    params.push(parseInt(req.query.maxYear));
  }

  // duration(runtime) query
  if (req.query.minDuration) {
    query += ` AND runtime >= ?`;
    params.push(parseInt(req.query.minDuration));
  }

  if (req.query.maxDuration) {
    query += ` AND runtime <= ?`;
    params.push(parseInt(req.query.maxDuration));
  }

  // genre query, accept multiple
  if (req.query.genre) {
    const genres = Array.isArray(req.query.genre)
      ? req.query.genre
      : [req.query.genre];
    genres.forEach((g) => {
      query += ` AND genre LIKE ?`;
      params.push(`%${g}%`);
    });
  }

  // set max number of result at 1000 movies
  const limit = parseInt(req.query.limit) || 1000;
  query += ` LIMIT ?`;
  params.push(limit);

  // run the query, if error throw error messages
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows); // send results as JSON file
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});  
