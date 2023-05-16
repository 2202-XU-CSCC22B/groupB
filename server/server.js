//Importing express module
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Router = require("./routes");

mongoose.set("strictQuery", false);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3080;

const user = "zen"
const pass = "RRqQveYMsiMRzgIR"
const cluster = "main" //eeppc
const name = "test"
const gen = "mdgajbf" //xm9nfsr

//Connection to the mongodb database
mongoose.connect(
    `mongodb+srv://${user}:${pass}@${cluster}.${gen}.mongodb.net/${name}?retryWrites=true&w=majority`, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: false
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(Router);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});