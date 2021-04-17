const express = require('express');
// express router handles incoming requests and directs them where they need to go
// like a traffic cop
const router = express.Router();

// import the sql connection
const connect = require("../config/sqlConfig");

// think of route handlers like PHP functions

router.get("/", (req, res) => {
    // res.json = echo json_encode(...) in PHP
    res.json({message: "you hit the api route"});
});

// this is the /api/users route handler location
// You can duplicate the function for users if you have multiple
router.get("/users", (req, res) => {
    // run a SQL query here
    // res.json(query result here)
    // echo a message -> just like PHP
    res.json({message: "all users route"});
})

router.get("/movies", (req, res) => {
    // run a SQL query here -> get all movies from my DB
    connect.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query('SELECT m.*, GROUP_CONCAT(g.genre_name) as genre_name FROM tbl_movies m NATURAL LEFT JOIN tbl_genre g NATURAL JOIN tbl_mov_genre GROUP BY m.movies_id', function (error, results) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;

          res.json(results);
        });
    });
})

// dynamic route handler that can accept a parameter
// this is equivalent to $_GET["id"] => (req.params.id)
// you're passing the id via the route: /api/movies/20, etc
router.get("/movies/:filter", (req, res) => {
    // run a SQL query here -> get all movies from my DB
    connect.query(`SELECT m.*, GROUP_CONCAT(g.genre_name) AS genre_name FROM tbl_movies m LEFT JOIN tbl_mov_genre link ON link.movies_id = m.movies_id LEFT JOIN tbl_genre g ON g.genre_id = link.genre_id WHERE g.genre_name LIKE "%${req.params.filter}%" GROUP BY m.movies_id`, function (error, results) {

        if (error) throw error;

        console.log("results:", results);
        res.json(results);
      });
})

module.exports = router;