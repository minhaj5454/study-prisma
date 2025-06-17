
const upload = require('../../middlewares/modules/multer');
//below 'get' variable is the allow anything variable, no matter if it is single image or text.
const get = require('multer')();
//Authorization middleware is getting imported.
const authorization = require('../../middlewares/auth/jwtAuth');
//modules from controllers.
const commentController = require('../../controller/comment/comment');

module.exports = async (app) => {

/**
 * @swagger
 * /createComment:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - Comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               userId:
 *                 type: integer
 *               postId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
/**
 * @swagger
 * /getAllComment:
 *   post:
 *     summary: Get all comments
 *     tags:
 *       - Comment
 *     responses:
 *       200:
 *         description: List of comments
 */
app.post("/createComment", commentController.createComment)
app.post("/getAllComment", commentController.getAllComment)



};
