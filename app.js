
const dotenv = require('dotenv');
const express = require('express');
const {mongoose} = require('mongoose');
const app = express();

dotenv.config({path:'./config.env'});
app.use(express.json());


require('./DB/conn');
const PORT = process.env.PORT;
app.use(require('./router/auth'));
//const User = require('./Model/schema');

app.get('/', (req,res) => {
    res.send(`Hello world`);
});
app.listen(4000, () => {
    console.log(`success`);
});
const middle = (req,res,next) => {
    console.log(`Same to you`);
    next();
};
app.get('/about', middle, (req,res) => {
    res.send(`Hello world`);
});

