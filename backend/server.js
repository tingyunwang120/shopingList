/* const debug = require("debug")("node-angular");
const http = require("http");*/
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');
const multer = require("multer");
const fs = require('fs');
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

app.use(cors())

app.use("/images", express.static((path.join('images'))))
const listSchema = mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  type: { type: String, required: true },
  imagePath: { type: String, required: false },
  dish: { type: String, required: false },
});
const List = mongoose.model('ListTest', listSchema);
mongoose
  .connect(
    "**********"
    , { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!!!!!!!!");
  })
  .catch((err) => {
    console.log(err, "Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*app.use(express.static(__dirname + '/dist'));
 app.get('/', (req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname });
}); */



app.post("/api/lists", multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  if (req.file)
    //imagePath = "api/images/" + req.file.filename
    imagePath = url + "/images/" + req.file.filename
  else
    imagePath = ''

  const list = new List({
    name: req.body.name,
    status: req.body.status,
    type: req.body.type,
    imagePath: imagePath,
    dish: req.body.dish
  });
  list.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      imagePath: imagePath,
      listId: createdPost._id
    });
  });
});

app.get("/api/lists", (req, res, next) => {
  List.find().then(response => {

    res.status(200).json({
      message: "Posts fetched successfully!",
      list: response.map(v => ({
        id: v._id, name: v.name,
        status: v.status, type: v.type,
        imagePath: v.imagePath,
        dish: v.dish
      }))
    });
  });
});

app.put("/api/lists", (req, res, next) => {
  console.log('update')
  const list = new List({
    _id: req.body.id,
    name: req.body.name,
    status: req.body.status,
    type: req.body.type
  });
  console.log('list', list)
  List.updateOne({ _id: req.body.id }, list).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

app.put("/api/lists/group", (req, res, next) => {

  var updates = req.body.map(item => {
    return List.updateOne({ _id: item.id }, new List({
      _id: item.id,
      name: item.name,
      status: item.status,
      type: item.type,
      dish: item.dish
    }));
  });

  Promise.all(updates).then(results => {
    res.status(200).json({ message: "Update successful!" })
  });
});

app.post("/api/lists/delete", (req, res, next) => {
  console.log(req.body)

  List.deleteOne({ _id: req.body.id }).then(result => {
    thispath = jsonPath = path.join(__dirname)
    if (req.body.imagePath || req.body.imagePath.length > 0) {
      filename = req.body.imagePath.split("/").pop()
      //fs.unlinkSync("/images/" + filename)
      fs.unlinkSync(thispath + '/images/' + filename)//"api/images/"
    }
    res.status(200).json({ message: "Post deleted!" });
  });
});
const server = app.listen(port, "0.0.0.0", function () {
  console.log('Server listening on port ' + port);
});

//deleteMany
app.post("/api/lists/deleteMany", (req, res, next) => {
  console.log(req.body)
  var updates = req.body.map(item => {
    return List.deleteOne({ _id: item.id });
  });

  Promise.all(updates).then(results => {
    thispath = jsonPath = path.join(__dirname)
    for (let i = 0; i < req.body.length; i++) {
      if (req.body[i].imagePath || req.body[i].imagePath.length > 0) {
        filename = req.body[i].imagePath.split("/").pop()
        fs.unlinkSync(thispath + '/images/' + filename)//"api/images/"
      }
    }
    
    res.status(200).json({ message: "Post deleted!" });
  });


/*   List.deleteOne({ _id: req.body.id }).then(result => {
    thispath = jsonPath = path.join(__dirname)
    if (req.body.imagePath || req.body.imagePath.length > 0) {
      filename = req.body.imagePath.split("/").pop()
      fs.unlinkSync(thispath + '/images/' + filename)//"api/images/"
    }
    res.status(200).json({ message: "Post deleted!" });
  }); */
});
