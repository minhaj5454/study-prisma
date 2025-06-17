//Router is getting imported from the express.
// const router = require('express').Router();
//below 'upload' variable helps to upload images.
const upload = require('../../middlewares/modules/multer');
//below 'get' variable is the allow anything variable, no matter if it is single image or text.
const get = require('multer')();
//Authorization middleware is getting imported.
const authorization = require('../../middlewares/auth/jwtAuth');
//modules from controllers.
const userController = require('../../controller/user/user');

module.exports = async (app) => {

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
/**
 * @swagger
 * /updateUser:
 *   post:
 *     summary: Update a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User updated successfully
 */
/**
 * @swagger
 * /findUser:
 *   post:
 *     summary: Find a user by email
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User found successfully
 */
/**
 * @swagger
 * /test-header:
 *   post:
 *     summary: Test custom header in request
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: x-test-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Custom test token header
 *     responses:
 *       200:
 *         description: Custom header received successfully
 *       400:
 *         description: Missing x-test-token header
 */

/**
 * @swagger
 * /uploadImg:
 *   post:
 *     summary: Upload a profile picture
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 */
  app.post("/uploadImg", upload.single('profilePic'), userController.uploadImg);
app.post("/createUser", userController.creatUser)
app.post("/updateUser", userController.updateUser)
app.post("/findUser", userController.findUser)
app.post("/test-header", userController.testUser)
};
