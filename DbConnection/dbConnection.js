const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path : './config/config.env'});

const dbconnection = ()=>{
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DATA BASE CONNECTED SUCCESSFULLY!!!")
})
.catch((err)=>{
    console.log("GETTING AN ERROR WHILE CONNECTING WITH DATA BASE :",err)
})
   

}

module.exports = dbconnection;