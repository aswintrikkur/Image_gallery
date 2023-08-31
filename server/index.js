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



app.use('/api/imageList', imageListRouter);

app.use('*', (req, res) => {
    res.status(404).json('end-ponit does not exist')
});
