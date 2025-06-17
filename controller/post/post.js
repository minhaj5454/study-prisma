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
const prisma = require("../../config/db.config")

exports.creatPost = async(req, res) => {
    try {
        const {title, description, userId} = req.body;


        const findUser = await postService.findByAny({title}) 
        


        if(findUser){
            return res.status(400).send({
                response : "failed",
                message : req.t("post_already_exist")
            })
        }
        const createPost = {title, description,userId: Number(userId)};
        const newPost = await postService.createAny(createPost)

        return res.status(201).send({
            response : "success",
            message : req.t("post_created_successfully"),
            result : newPost
        })

    } catch (error) {
        console.log(error)
    }
}


exports.getAllPost = async(req,res) => {
    try {
        let {search, page, limit, startDate, endDate} = req.body;

       page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    let skip = (page - 1) * limit;

    startDate = startDate ? new Date(startDate) : null;
    endDate = endDate ? new Date(endDate) : null;

    // Prisma-compatible query object
let where = {};

// Full-text search (you must have @@fulltext index for this to work)
if (search) {
  where.OR = [
    { title: { search } },
    { description: { search } }
  ];
}

// Date filtering
if (startDate || endDate) {
  where.createdAt = {};
  if (startDate) where.createdAt.gte = startDate;
  if (endDate)   where.createdAt.lte = endDate;
}
      const { totalPosts, posts } = await postService.getAll(where, limit, skip);
    const totalPages = Math.ceil(totalPosts / limit);

        // optional “no data” message
    if (posts.length === 0) {
      return res.status(200).send({
        response : 'success',
        message  : req.t('no_posts_found'),
        totalPosts,
        totalPages,
        page,
        limit,
        result   : posts,
      });
    }

    // success response
    return res.status(200).send({
      response : 'success',
      message  : req.t('post_list_fetched'),
      totalPosts,
      totalPages,
      page,
      limit,
      result   : posts,
    });
  } catch (err) {
    console.error('error in getAllPost:', err);
    return res.status(500).send({
      response : 'failed',
      message  : req.t('something_went_wrong'),
    });
  }
};