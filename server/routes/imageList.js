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

// to add new image to the dataBase
const updateDataBase = (filename) => {
    let newData = {
        id: uuid4().slice(0, 8),
        image: `${filename}`
    }
    fs.readFile('./dataBase.json', (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        json.unshift(newData);
        console.log('updated DB', json);
        fs.writeFile('./dataBase.json', JSON.stringify(json), (err) => {
            if (err) throw err;
        })
    })
}

router.get('/', (req, res) => {
    console.log('inside router level middleware in /api/imageList on GET ');
    res.json({
        message: "image updated",
        imageList: database
    })
});

// here upload.single() is a specifc middleware. it is called only in POST method of '/upload' end-point.
router.post('/upload', upload.single('upload_image'), (req, res, next) => {
    console.log('inside router level middleware in /api/imageList/upload on POST ')
    // console.log('body:', req.body);
    // console.log('file:', req.file);

    updateDataBase(req.file.filename);

    /*trial 1 --- failed */
    // console.log(database);
    // res.json({
    //     message: 'image uploaded',
    //     imageList: database
    // });

    /*trial 2  --- failed */
    // fs.readFile('./dataBase.json', 'utf8', (err, data) => {
    //     if (err) { throw err; }
    //     console.log('Read DB :', (data));
    //     res.status(200).json({
    //         message: 'image uploaded',
    //         imageList: JSON.parse(data)
    //     })
    // })
    /* the issue you're encountering could indeed be related to the asynchronous behavior of Node.js.
     When reading the JSON file immediately after writing to it, there might be a slight delay between the
      write operation completing and the changes being visible in the read operation.
       This can sometimes lead to reading older data due to buffering and caching. */

    /* trail 3 --- failed------ this is not possible */
    //  router.get( (req, res) => {
    //     console.log('inside router level middleware in /api/imageList on GET ');
    //     res.json({
    //         message:"image uploaded",
    //         imageList: database
    //     })
    // });

    /* trail 4 --- SUCCESS ---- 
     Reloading the page, 1000ms after image being uploaded. so GET method called automatically on useEffect()   */
    res.json({
        message: 'image uploaded'
    })

});


module.exports = router;