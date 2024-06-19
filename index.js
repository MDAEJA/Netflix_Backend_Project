const express = require("express");
const dotenv = require("dotenv");
const dbconnection = require("./DbConnection/dbConnection");
const routers = require("./mvc_structure/routes/userRoutes");
const cors = require("cors")
const cookieParser = require("cookie-parser");

dotenv.config({path : './config/config.env'})

const app = express();
const corsOptions = {
    origin : 'https://dazzling-sprinkles-6a38c5.netlify.app',
    credentials : true
}
app.use(express.json());
// app.use(cookieParser());
app.use(cors(corsOptions))

app.use("/create",routers)
app.use('/user',routers)
app.use("/userlogout",routers)


dbconnection();
app.listen(process.env.PORT,()=>{
    console.log("SERVER IS CONNECTED AT PORT :",process.env.PORT)
})