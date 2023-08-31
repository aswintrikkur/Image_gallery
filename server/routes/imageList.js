const express = require('express');
const router = express.Router();
const database = require('../dataBase.json');
const { upload } = require('../middleware/multer');
const fs = require('fs');
const { PORT } = require('../port');
const { v4: uuid4 } = require('uuid')

// fs.readFile('public/images/upload_image-1692899754928-155645223.jpg', 'utf8', (err, data) => {
//     if (err) { throw err; }
//     console.log(data);
// })

// fs.appendFile('./dataBase.json', 'newData' , (err) => {
//     if (err) throw err;
// });
let count = 10;

const updateDataBase = (filename) => {
    let newData = {
        id: uuid4().slice(0,8),
        image: `${filename}`
    }
    fs.readFile('./dataBase.json', (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        json.unshift(newData);
        fs.writeFile('./dataBase.json', JSON.stringify(json), (err) => {
            if (err) throw err;
        })
    })
}

router.get('/', (req, res) => {
    res.json({
        imageList: database
    })
});

router.post('/upload', upload.single('upload_image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    updateDataBase(req.file.filename);
    res.json({
        message: 'image uploaded',
        imageList: database
    });
})

module.exports = router;