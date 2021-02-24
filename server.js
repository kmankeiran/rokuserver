const express = require('express');
const app = express();

const port = process.env.PORT || 5050;

// this catches every route request - everytime you change your location bar, this function reacts to it and intercepts the route request.
app.use((req, res, next) => {
    console.log('incoming request');
    console.log(port);

    // next is the original route request ie. /api/users
    next(); // => send the user to the route they requested
})

// Use the API route file to handle API routes (/api/users, /api/:user/:id, etc)

// If the user ever enters the /api after the website url, direct it to the api JS file in the routes folder
app.use("/api", require("./routes/api"));

// run the app at the PORT 
app.listen(port, () => {
    console.log(`server is running on ${port}`);
})