
const upload = require('../../middlewares/modules/multer');
//below 'get' variable is the allow anything variable, no matter if it is single image or text.
const get = require('multer')();
//Authorization middleware is getting imported.
const authorization = require('../../middlewares/auth/jwtAuth');
//modules from controllers.
const postController = require('../../controller/post/post');

module.exports = async (app) => {

/**
 * @swagger
 * /createPost:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post created successfully
 */
/**
 * @swagger
 * /getAllPost:
 *   post:
 *     summary: Get all posts
 *     tags:
 *       - Post
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *               page:
 *                 type: integer
 *               limit:
 *                 type: integer
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: List of posts
 */
app.post("/createPost", postController.creatPost)
app.post("/getAllPost", postController.getAllPost)

};
