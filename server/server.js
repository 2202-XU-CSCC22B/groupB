require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const passRouter = require("./routes/passRoutes");
const fileRouter = require("./routes/fileRoutes");

mongoose.set("strictQuery", false);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3080;

const mongoDB = process.env.DB;

// Connection to the MongoDB database
mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: false
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://groupB.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Routes
app.use('/passes', passRouter);
app.use('/', fileRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});