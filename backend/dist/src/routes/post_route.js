"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../controllers/post_controller"));
const auth_controller_1 = require("../controllers/auth_controller");
/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The Posts API
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *       bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      Error:
 *          type: object
 *          required:
 *              - error
 *          properties:
 *              error:
 *                  type: string
 *          example:
 *              error: 'An error occurred during authentication.'
 *
 *      PostComment:
 *          type: object
 *          required:
 *              - owner
 *              - content
 *          properties:
 *              owner:
 *                  type: string
 *                  description: The user id
 *              content:
 *                  type: string
 *                  description: The comment content
 *          example:
 *              owner: '123'
 *              content: 'This is a comment'
 *
 *      Post:
 *          type: object
 *          required:
 *              - type
 *              - gpu
 *              - cpu
 *              - motherboard
 *              - memory
 *              - ram
 *              - image
 *              - comments
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The post id
 *              owner:
 *                  type: string
 *                  description: The post creator
 *              type:
 *                  type: string
 *                  description: The computer type
 *              gpu:
 *                  type: string
 *                  description: The gpu name
 *              cpu:
 *                  type: string
 *                  description: The cpu name
 *              motherboard:
 *                  type: string
 *                  description: The motherboard name
 *              memory:
 *                  type: string
 *                  description: The memory name
 *              ram:
 *                  type: string
 *                  description: The ram name
 *              image:
 *                  type: string
 *                  description: The post image
 *              comments:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/PostComment'
 *          example:
 *              type: 'gaming'
 *              gpu: 'asus'
 *              cpu: 'intel'
 *              motherboard: 'asus'
 *              memory: 'kingston'
 *              ram: 'ram'
 *              image: 'image'
 *              comments: []
 */
/**
 * @swagger
*  /get/getMyPosts:
*   get:
*       summary: Get all of my posts
*       tags: [Posts]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: returns post array
*               content:
*                   application/json:
*                       schema:
*                       type: array
*                       items:
*                           $ref: '#/components/schemas/Post'
*           403:
*              description: Wrong token used
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/Error'
*           500:
*               description: error in db
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Error'
*/
router.get("/getMyPosts", auth_controller_1.authMiddleware, post_controller_1.default.getMyPosts.bind(post_controller_1.default));
/**
 * @swagger
*  /get:
*   get:
*       summary: get post/posts
*       tags: [Posts]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: returns post array
*               content:
*                   application/json:
*                       schema:
*                       type: array
*                       items:
*                           $ref: '#/components/schemas/Post'
*           403:
*              description: Wrong token used
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/Error'
*           500:
*               description: error in db
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Error'
*/
router.get("/", auth_controller_1.authMiddleware, post_controller_1.default.get.bind(post_controller_1.default));
/**
 * @swagger
 * /get/:id:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       403:
 *         description: Wrong token used
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error in database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", auth_controller_1.authMiddleware, post_controller_1.default.get.bind(post_controller_1.default));
/**
 * @swagger
 * /post:
 *  post:
 *      summary: Creates a new post
 *      tags: [Posts]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: The new post
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          403:
 *              description: Wrong token used
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          401:
 *              description: No token provided
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
router.post("/", auth_controller_1.authMiddleware, post_controller_1.default.post.bind(post_controller_1.default));
/**
 * @swagger
 * /post:
 *   put:
 *     summary: Updates an existing post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The updated post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       403:
 *         description: Wrong token used
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: db error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/", auth_controller_1.authMiddleware, post_controller_1.default.put.bind(post_controller_1.default));
/**
 * @swagger
 * /post:
 *   delete:
 *     summary: Deletes a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted the post
 *       403:
 *         description: Wrong token used
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: db error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/", auth_controller_1.authMiddleware, post_controller_1.default.delete.bind(post_controller_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map