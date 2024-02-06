const mongoose = require("mongoose");

const uri = "mongodb+srv://zl3950:1438824Kerry@ecommerce.24ffuwi.mongodb.net/?retryWrites=true&w=majority"

async function connect (){
    try {
        await mongoose.connect(uri);
        console.log("connect to MongoDB");
    } catch(error){
        console.error(err);
    }
}

const connectDatabase = ( )=>{
    mongoose.connect("mongodb://localhost:27017/Ecommerce").then(
        (data)=>{
            console.log(`Mongodb connected with server : ${data.connection.host}`);
        })
        .catch((err)=>{
            console.log(err);
        })
}

module.exports = connectDatabase 