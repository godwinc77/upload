const express = require("express");
const app = express();
const path = require('path');
const fileupload = require("express-fileupload")
const body_parser = require("body-parser")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images')
    },
    filename:(req, file, cb) => {
        console.log(file)
        cb(null, Date.now() +path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

app.set("view engine", "ejs");
app.set ('views', './views')
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
app.use(fileupload())

app.get("/", (req,res) => {
    res.render("upload");
});

app.post("/upload", upload.single('image'), (req,res) => {
    res.send("Image Uploaded");
});

app.listen(3000);
