const debug = require("debug")("node-angular");
const http = require("http");
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');
const { response } = require("express");
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
app.use(cors())
app.use(express.static(__dirname + '/dist/shopingList'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app)
//const hostname = '0.0.0.0';;
server.on("error", onError);
server.on("listening", onListening);
server.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
const listSchema = mongoose.Schema({
  //id: { type: Number, required: true },
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  type: { type: String, required: true }
});
const List = mongoose.model('List', listSchema);
mongoose
  .connect(
    "mongodb+srv://Tingyun:edcrfvt1@cluster0.yz1h9.mongodb.net/<dbname>?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err, "Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/lists", (req, res, next) => {
  const list = new List({
    //id: req.body.id,
    name: req.body.name,
    status: req.body.status,
    type: req.body.type
  });
  list.save().then(createdPost => {
    console.log('yaaay')
    res.status(201).json({
      message: "Post added successfully",
      listId: createdPost._id
    });
  });
});

app.get("/api/lists", (req, res, next) => {
  List.find().then(response => {
    
    res.status(200).json({
      message: "Posts fetched successfully!",
      list: response.map(v=>({id: v._id, name: v.name, status: v.status, type: v.type}))
    });
  });
});

app.put("/api/lists", (req, res, next) => {
  console.log('update', req.body)
  const list = new List({
    _id: req.body.id,
    name: req.body.name,
    status: req.body.status,
    type: req.body.type
  });
  console.log(list)
  List.updateOne({ _id: req.body.id }, list).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

app.delete("/api/lists/:id", (req, res, next) => {
  console.log('id', req.params.id)
  List.deleteOne({ _id: req.params.id }).then(result => {
    
    res.status(200).json({ message: "Post deleted!" });
  });
}); 