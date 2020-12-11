const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { MONGOURI, PORT } = require("./keys");

/* 
var corsOptions = {
  origin: "https://localhost:8081"
};
app.use(cors(corsOptions));
 */

app.use(cors());

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
        // set port, listen for requests
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}, connected to Mongo Atlas DB.`);
        });
  })
  .catch((err) => console.log(err));


// Middleware
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
app.use('/api', require('./routes/auth'));


// simple route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Movie Hut Backend!" });
});


