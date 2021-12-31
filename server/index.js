const dotenv = require('dotenv')
const result = dotenv.config({path:".env"});
var mongoose = require('mongoose');

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {MongoClient} = require('mongodb');
const path = require('path');
const db = require("./models");
const Role = db.role;
const dbConfig = require("./config/db.config.js");

var corsOptions = {
  origin: "http://localhost:8081"
};

console.log('test')
console.log(process.env.VAR);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, 'build')));

// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();
//   mongoose.connect('mongodb+srv://zawad:Beyblad1@cluster0.vzewp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
  
//   var db = mongoose.connection;
//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     } 
//   });
// }

// async function main() {
//   const uri = "mongodb+srv://zawad:Beyblad1@cluster0.vzewp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//   const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await listDatabases(client);

//         initial();
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);