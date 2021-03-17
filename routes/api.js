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
        connection.query('SELECT * FROM tbl_movies', function (error, results) {
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
router.get("/movies/:id", (req, res) => {
    // run a SQL query here -> get all movies from my DB
    connect.query(`SELECT * FROM tbl_movies WHERE movies_id=${req.params.id}`, function (error, results) {

        if (error) throw error;

        console.log("results:", results, "fields:", fields);
        res.json(results);
      });
})

module.exports = router;