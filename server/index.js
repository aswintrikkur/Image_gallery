const express = require('express');
const cors = require('cors');
const imageListRouter = require('./routes/imageList');
const { PORT } = require('./port');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));


app.listen(PORT, () => {
    console.log(`---------server started in ${PORT}-----------`);
});

app.use('/api/imageList', (req,res,next)=>{
    // when ever this end-point is called along with get/post/put/delete ,
    //  it first come to this middleware and executes its code.
    console.log('inside application level middleware');  

    next(); // this method directs the programme to jumps to the next/desired end-point.
    // if this method didn't call, programme stays here.
});


app.use('/api/imageList', imageListRouter);     // calling router level middleware

app.use('*', (req, res) => {
    res.status(404).json('end-ponit does not exist')
});
