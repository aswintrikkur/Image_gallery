const express = require('express');
const cors = require('cors');
const database= require('./dataBase.json');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = 3007;
app.listen(PORT, () => {
    console.log(`---------server started in ${PORT}-----------`);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+extension);
    }
  })

  const upload = multer({storage:storage});

app.get('/api/imageList',(req,res)=>{
    res.json(database)
});

app.post('/api/upload', upload.single('upload_image'), (req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.json('image uploaded')
    // res.json('new image uploaded')
})