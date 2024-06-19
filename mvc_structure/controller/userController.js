// logical buildings
const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createAccount = async (req,res)=>{
    try{
        const {userName,email,password} = req.body;
        if(!userName,!email,!password){
            return res.status(404).json({
                status : false,
                message : "REquired All Fields!!"
            })
        };

        const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const specialchar = /[!@#$%^&*()?.,<>]/.test(password);
    const number  = /[0123456789]/.test(password);

    if(!uppercase || !lowercase || !specialchar || !number){
        return res.status(404).json({
            status :false,
            message : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        })
    };

    if(!(email.includes("@"))){
        return  res.status(404).json({
            status : false,
            message : "Incorrect Email"
        })
    };

    const emailIsPresent = await userModel.findOne({email});

    if(emailIsPresent){
        return res.status(401).json({
            status : false,
            message : "Email is already registered, please login."
        })
    }

    const userData = {
        userName,email,password
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);

    const userHashData = new userModel({
        ...userData,password : hash
    })

    await userHashData.save();

        res.json({
            status : true,
            message : "ACCOUNT Is CREATED SUCCESSFULLY!!!"
        });

    }
    catch(err){
        return res.status(404).json({
            status : false,
            message : err.message
        })
    }
}

const login = async(req,res)=>{
    try{
const{email,password} = req.body;

const checkEmail = await userModel.findOne({email});

if (!checkEmail) {
    return res.status(404).json({
      status: false,
      message: "Resource not found. Please register first",
    });
  };

  const getPassword = checkEmail.password;
  const isPasswordValid = bcrypt.compareSync(password,getPassword);

  if (!getPassword) {
    return res.status(500).json({
      status: false,
      message: "Error retrieving password from the database",
    });
  };

  if (!isPasswordValid) {
    return res.status(401).json({
      status: false,
      message: "Invalid Email OR Password",
    });
  }

  //jwt token 

  const token = jwt.sign({
    checkEmail
  },process.env.SECRET_KEY,{expiresIn:'1h'});

  res.cookie("token",token,{httponly : true}).json({
    status :true,
    user_name : checkEmail.userName,
    token,
  })

    }
    catch(err){
        return res.status(404).json({
            status : false,
            message : err.message
        })
    }
}

const logout = (req,res)=>{
    return res.cookie("token","",{expiresIn:new Date(Date.now()),httponly:true}).json({
        status : true,
        message : "Logout Successfully!!"
    })
}

const userController = {
    createAccount,login,logout
}

module.exports = userController;