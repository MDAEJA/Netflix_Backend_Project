const express = require("express");
const userController = require("../controller/userController");

const routers = express.Router();

routers.post("/signup",userController.createAccount);
routers.post("/login",userController.login)
routers.get("/logout",userController.logout)


module.exports = routers