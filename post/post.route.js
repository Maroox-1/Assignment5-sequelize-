const postcontroller = require('./post.controller')
const {Router} = require('express')


const postRouter = Router();


postRouter.post('/', postcontroller.createPost);
postRouter.get('/details', postcontroller.getAllPostsWithDetails);
postRouter.get('/comment-count', postcontroller.getAllPostsWithCommentCount);
postRouter.delete('/:postId', postcontroller.deletePost);


module.exports = postRouter ;