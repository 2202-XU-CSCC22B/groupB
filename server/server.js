const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const passRouter = require("./routes/pass_routes");
const fileRouter = require("./routes/file_routes");

mongoose.set("strictQuery", false);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3081;

const user = "zen";
const pass = "RRqQveYMsiMRzgIR";
const cluster = "cluster";
const name = "main";

// Connection to the MongoDB database
mongoose.connect(
  `mongodb+srv://${user}:${pass}@${cluster}.mdgajbf.mongodb.net/${name}?retryWrites=true&w=majority`,
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

// Routes
app.use('/passes', passRouter);
app.use('/', fileRouter);

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});