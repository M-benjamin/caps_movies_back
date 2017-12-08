const express        = require('express');
const path           = require('path');
const moment         = require('moment');
const bodyParser     = require('body-parser');
const colors         = require('colors');

// Setting base directory as a global /!\
global.__basedir = __dirname;

// Initialize database
const db = require('./models');

// Instantiate express application
const app = express();

// Setting the application port depending to environment
const port = process.PORT || 5000;

// Application middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET /infos
app.get('/', (req, res) => {
  res.status(200).json({ hi: "mCaps Rocks!"});
})

// About routes definition
const index = require('./routes/index');
const users = require('./routes/users');
const caps  = require('./routes/caps'); 


app.use('/', index);
app.use('/caps', caps);
app.use('/users', users);

// Catching 404 error and forwarding to error handler
app.use((req, res, next) => {
  res.status(404).json({err : "Page Not Found"})
  next();
});

// LET'S ROCK!

// database synchronization ...
db.sequelize.sync({}).then(() => {
  console.log("Database configuration success!".green);

  // ... and server listening
  app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`.green);
  });

}).catch((err) => {
  console.error(`Unable to connect to the database ${err}`.red);
});
