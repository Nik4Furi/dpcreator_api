const mongoose = require('mongoose');

//Connect app with database
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true}). 
then( ()=> console.log('Connection to database')). 
catch((e) => console.error('Error occured during connection to database ',e))