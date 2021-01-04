//mongoDB login creds:
//user0
//vuVYcNGUzTRhtag7

const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const coursesRoutes = require('./routes/courses')
const schedulesRoutes = require('./routes/schedules')
const userRoutes = require('./routes/user')

const app = express();

mongoose.connect("mongodb+srv://user0:vuVYcNGUzTRhtag7@cluster0.urhpg.mongodb.net/userDB?w=majority", { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connected to database!");
}).catch(()=>{
  console.log("Connection to database failed!")
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `*`);
  res.header(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    'Access-Control-Allow-Methods',
    `GET, POST, PUT, PATCH, DELETE, OPTIONS`
  );
  console.log(`${req.method} request for ${req.url}`);
  next();
})

app.use("/api/courses", coursesRoutes)
app.use("/api/schedules", schedulesRoutes)
app.use("/api/user", userRoutes)

module.exports = app;
