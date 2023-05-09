//Importing express module
const express = require('express');
const mongoose = require('mongoose');
const Router = require("./routes")

mongoose.set("strictQuery", false);
 
const app = express();
app.use(express.json());

const PORT = 3080;

const user = "zen"
const pass = "RRqQveYMsiMRzgIR"
const cluster = "eeppc"
const name = "test"

//Connection to the mongodb database
mongoose.connect(
    `mongodb+srv://${user}:${pass}@${cluster}.xm9nfsr.mongodb.net/${name}?retryWrites=true&w=majority`, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(Router);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});