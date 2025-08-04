const sqlite3 = require("sqlite3").verbose(); // SQLite: work with database
const fs = require("fs"); // File system module: used to read the CSV file
const csv = require("csv-parser"); // CSV parser: stream-based library to parse CSV row by row

const db = new sqlite3.Database("./movies.db"); // connect to the SQLite database file

db.serialize(() => {
  // remove existing table if any, to reset the database
  db.run("DROP TABLE IF EXISTS movies");

  // create a new 'movies' table with all expected fields, ID being primary key to avoid duplicates
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

  const movies = []; // temporary array to store rows before inserting
  let id = 1; // manually assign IDs starting from 1

  // read and parse the CSV file
  fs.createReadStream("100k.csv")
    .pipe(csv())
    .on("data", (row) => {
      // push each row of data into the 'movies' array as a prepared row
      movies.push([
        id++,
        row.title || null,
        parseInt(row.runtime) || null,
        row.genre || null,
        parseFloat(row.imdb_ratings) || null,
        parseFloat(row.rt_ratings) || null,
        null,              // metacritic_score not available in CSV
        null,              // director not available
        null,              // cast not available
        row.description || null,
        parseInt(row.released_year) || null,
        row.link               // link not available
      ]);
    })
    .on("end", () => {
      // prepare the SQL insert statement, because if we run db.run() everytime it will cost more and may lead to SQL injection errors
      const statement = db.prepare(`
        INSERT INTO movies (
          id, title, runtime, genre,
          imdb_score, rt_score, metacritic_score,
          director, cast, description,
          year, link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `); 

      // insert each movie into the database by running the statement query
      movies.forEach((movie) => {
        statement.run(movie);
      });

      statement.finalize(); // finish the prepared statement
      db.close(); // close the database connection
    });
});