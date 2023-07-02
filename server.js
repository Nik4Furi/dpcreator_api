require('dotenv').config() //When you install first column dependies
require('./db') //When configure your connection with database

const express = require('express')
const app = express();

const cors = require('cors') //When your app's api connect with the forntend applications
app.use(cors())

//When use your app any json object or form fill up
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Define the cloudinary img uploading stuff
const cloudinary = require('cloudinary');
cloudinary.v2.config({
    cloud_name : process.env.CLOUNDINARY_CLIENT_NAME,
    api_key : process.env.CLOUNDINARY_CLIENT_API,
    api_secret : process.env.CLOUNDINARY_CLIENT_API_SECRET
})

//Setup our routes dependence of versions
if(process.env.VERSION == 'v1'){
    console.log('v1')
    
    const routers = require('./src/api/v1/routers') //Connect your routes here

    app.use('/api/user',routers) //Can define path or respose of your apis path
}

const Server = process.env.SERVER || 'http://localhost';
const Port = process.env.PORT || 8000 ;

app.listen(Port,()=> console.info(`Application listen at ${Server}:${Port}`))