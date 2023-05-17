const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const methodOverride = require('method-override');

const passRouter = require("./routes/pass_routes");
const fileRouter = require("./routes/file_routes");

mongoose.set("strictQuery", false);

const app = express();
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

const PORT = 3080;

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

// Create a GridFS storage engine
const storage = new GridFsStorage({
  url: `mongodb+srv://${user}:${pass}@${cluster}.mdgajbf.mongodb.net/${name}?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: false },
  file: (req, file) => {
    return {
      bucketName: 'uploads', // Name of the GridFS collection
      filename: file.originalname // Use the original file name as the stored filename
    };
  }
});

// Create a multer middleware using the storage engine
const upload = multer({ storage });

// Routes
app.use('/pass', passRouter);
app.use('/file', fileRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});