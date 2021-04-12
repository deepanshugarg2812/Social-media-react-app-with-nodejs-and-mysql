const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended : true}));

app.use(cors());
app.use('/user',require('./Routes/Users'));
app.use('/upload',require('./Routes/Upload'));

app.listen(9999,(req,res) => {
    console.log("Server started at port 9999");
})