const app = require('./app')
const cloudinary = require('cloudinary')
// const dotenv = require('dotenv');
// const connectDatabase = require("./config/database")

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    process.exit(1)
})


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

// connectDatabase()

const mongoose = require("mongoose");
const uri = "mongodb+srv://zl3950:1438824Kerry.@ecommerce.24ffuwi.mongodb.net/?retryWrites=true&w=majority"

async function connect (){
    try {
        await mongoose.connect(uri);
        console.log("connect to MongoDB");
    } catch(error){
        console.error(error);
    }
}

connect();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://${process.env.PORT}`);
})

// unhandled promise rejection


process.on("unhandledRejection", (err) =>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1)
    })
})