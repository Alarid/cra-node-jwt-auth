const express = require('express');
const bodypParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models');
const dbConfig = require('./app/config/db.config');

// app
const app = express();
app.use(bodypParser.json());
app.use(bodypParser.urlencoded({extended: true}));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// db
const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    initial();
  })
  .catch((err) => {
    console.error("Connection error with database", err);
    process.exit();
  });

// Populate database on start with roles, if they don't exist
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      addRole("user");
      addRole("moderator");
      addRole("admin");
    }
  })
}

// Add a new role
function addRole(name) {
  new Role({name: name}).save((err) => {
    console.error("error adding new role", err);
  })
}

// simple route
app.get('/', (req, res) => {
  res.json({message: "Welcome to Dashboard Server"});
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});