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
const postService = require("../../services/post/postService")
const commentService = require("../../services/comment/commentService")
const prisma = require("../../config/db.config")

exports.createComment = async(req, res) => {
    try {
        const {comment, userId, postId} = req.body;


        // const findUser = await commentService.findByAny({}) 
        


        // if(findUser){
        //     return res.status(400).send({
        //         response : "failed",
        //         message : req.t("comment_already_exist")
        //     })
        // }
        const createcomment = {comment, postId : Number(postId), userId: Number(userId)};       
        const newcomment = await commentService.createAny(createcomment)
        const postData = {commentCount : {increment:1}}
        const increaseCommentCountInPost = await postService.updateAny(postId, postData)
        

        return res.status(201).send({
            response : "success",
            message : req.t("comment_created_successfully"),
            result : newcomment
        })

    } catch (error) {
        console.log(error)
    }
}


exports.getAllComment = async (req,res) => {
    try {

        const getComments = await commentService.getAll()

        return res.status(200).send({
            response : "success",
            message: req.t("got all comments"),
            result : getComments
        })

    } catch (error) {
        console.log(error)
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
        
        return res.status(201).send({
            response : "success",
            message : req.t("user_found_successfully"),
            result : findUser
        })

    } catch (error) {
        
    }
}