//jsonwebtoken generator and verification through this below jwt module.
const jwt = require('jsonwebtoken');
//Nodemailer is used to send email.
const nodemailer = require('nodemailer');
//below module is used to encrypt and compare the text(password).
const bcrypt = require('bcryptjs');
//Send Mail middleware/module to send email with different subjects and messages.
const sendMail = require('../../middlewares/mails/sendMail');
//Encryption module.This module encrypt random string into encrypted format with the special keys defined in the .env file.
const encrypt = require('../../middlewares/modules/encryption');
//Decryption module. This module decrypt encrypted string in the original format.
const decrypt = require('../../middlewares/modules/decryption');
const { validate } = require('../../middlewares/modules/validations/validate');
const USER_SCHEMA = require('../../middlewares/modules/validations/user').USER_SCHEMA;
const userService = require("../../services/user/userService")
const prisma = require("../../config/db.config")

exports.creatUser = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        const findUser = await userService.findByAny({email}) 
            


        if(findUser){
            return res.status(400).send({
                response : "failed",
                message : req.t("user_already_exist")
            })
        }
        const createData = {username,email,password};
        const newUser = await userService.createAny(createData)

        return res.status(201).send({
            response : "success",
            message : req.t("user_created_successfully")
        })

    } catch (error) {
        
    }
}


exports.updateUser = async(req, res) => {
    try {
        const {userId, username, email, password} = req.body;

        const findUser = await userService.getById(userId)

        if(!findUser){
            return res.status(400).send({
                response : "failed",
                message : req.t("user_not_exist")
            })
        }
        const updateData = {username, email, password}
        const updateUser = await userService.updateAny(userId,updateData)
        

        return res.status(201).send({
            response : "success",
            message : req.t("user_updated_successfully")
        })

    } catch (error) {
        
    }
}


exports.findUser = async(req, res) => {
    try {
        const {email} = req.body;

        const findUser = await userService.findByAny({email}) 
        
        return res.status(200).send({
            response : "success",
            message : req.t("user_found_successfully"),
            result : findUser
        })

    } catch (error) {
        
    }
}

exports.testUser =  async(req, res) => {
  const token = req.headers["x-test-token"];

  if (!token) {
    return res.status(400).json({
      message: "Missing x-test-token header",
    });
  }

  res.json({
    message: "Custom header received successfully",
    token,
  });

};


exports.uploadImg = async(req,res) => {
    try {
        
        return res.status(200).send({
            message: "Profile picture uploaded successfully",
            file : {
                    originalname: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
            }
        })

    } catch (error) {
        console.log(error);
        
    }
}