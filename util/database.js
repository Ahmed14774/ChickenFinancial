var sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
            userID INTEGER PRIMARY KEY AUTOINCREMENT,
            userName text UNIQUE,
            firstName text,
            lastName text,
            favEgg text,
            password text,
            CONSTRAINT username UNIQUE (username)
            )`,
      (err) => {
        if (err) {
          console.log(err);
        }
        else {
          var insert0 = 'INSERT INTO user (userName, firstName, lastName, favEgg, password) VALUES ("ayaeger", "Aaron", "Yaeger", "raw", "thechickencamefirst")';
          var insert1 = 'INSERT INTO user(userName, firstName, lastName, favEgg, password) VALUES ("wlu", "Wally", "Lu", "scrambled", "supersecretpassword")';
          db.run(insert0);
          db.run(insert1);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS account (
        accountID INTEGER PRIMARY KEY AUTOINCREMENT,
        userID integer,
        name text,
        numEgg integer,
        FOREIGN KEY(userID) REFERENCES user(userID)
      )`,
      (err) => {
        if (err) {
          console.log(err);
        }
        else {
          var insert0 = 'INSERT INTO account (userID, name, numEgg) VALUES (1, "New Boat Fund", 1000000)';
          var insert1 = 'INSERT INTO account (userID, name, numEgg) VALUES (2, "Savings", 100)';
          db.run(insert0);
          db.run(insert1);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS transfer (
        transferID INTEGER PRIMARY KEY AUTOINCREMENT,
        origin integer,
        target integer,
        date text,
        amount integer,
        authorized integer,
        comment text,
        FOREIGN KEY(origin) REFERENCES account(accountID),
        FOREIGN KEY(target) REFERENCES account(accountID)
      )`,
      (err) => {
        if (err) {
          console.log(err);
        }
        else {
          var insert0 = 'INSERT INTO transfer (origin, target, date, amount, authorized, comment) VALUES (2, 1, "2021-04-22 12:01:00", 1, 1, "Don\'t spend it all in one place.")';
          db.run(insert0);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS history (
        authID INTEGER PRIMARY KEY AUTOINCREMENT,
        userID integer,
        date text,
        action text,
        FOREIGN KEY(userID) REFERENCES user(userID)
      )`,
      (err) => {
        if (err) {
          console.log(err);
        }
        else {
          var insert0 = 'INSERT INTO history (userID, date, action) VALUES (1, "2021-04-22 08:30:00", "Authentication - Success")';
          db.run(insert0);
        }
      }
    );
  }
});

db.get("select current_timestamp", (err, out) => {
  console.log(out);
});

module.exports = db;