const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");

const db = new sqlite3.Database("./movies.db");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS movies");

  db.run(`
    CREATE TABLE movies (
      id INTEGER PRIMARY KEY,
      title TEXT,
      runtime INTEGER,
      genre TEXT,
      imdb_score REAL,
      rt_score REAL,
      metacritic_score REAL,
      director TEXT,
      cast TEXT,
      description TEXT,
      year INTEGER,
      link TEXT
    )
  `);

  const movies = [];
  let id = 1;

  fs.createReadStream("100k.csv")
    .pipe(csv())
    .on("data", (row) => {
      movies.push([
        id++,
        row.title || null,
        parseInt(row.runtime) || null,
        row.genre || null,
        parseFloat(row.imdb_ratings) || null,
        parseFloat(row.rt_ratings) || null,
        null,              // metacritic_score
        null,              // director
        null,              // cast
        row.description || null,
        parseInt(row.released_year) || null,
        null               // link
      ]);
    })
    .on("end", () => {
      const stmt = db.prepare(`
        INSERT INTO movies (
          id, title, runtime, genre,
          imdb_score, rt_score, metacritic_score,
          director, cast, description,
          year, link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      movies.forEach((movie) => {
        stmt.run(movie);
      });

      stmt.finalize();
      console.log(`Import complete! ${movies.length} movies imported.`);
      db.close();
    });
});
