const express=require('express');
const mongoose=require('mongoose');
const env=require('dotenv');
const connectToDatabase=require('./db/connection.js')
env.config();
const MensRanking=require('../src/models/mens.js')
const router=require('../src/routers/mens.js')
const PORT=process.env.PORT || 3000;

const app=express();
app.use(express.json());


//-----------connecting to database----------------------

connectToDatabase();
app.use(router);


//-------------handling the post method---------------

app.listen( PORT , ()=>{
    console.log(`App is running on PORT: ${PORT}`)
})