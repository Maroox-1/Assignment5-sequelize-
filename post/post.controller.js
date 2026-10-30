const postservice = require('./post.service')

async function createPost(req, res , next) {
    try {
        const { title, content, userId } = req.body;
        const createdPost = await postservice.createPost(title, content, userId);

        res.status(201).json({
            message: 'Post created successfully',
            success: true,
            data : createdPost,
        })
    } catch (e){
        if (e.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: e.errors.map(err => err.message),
                success: false
            })
        }
        if (e.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                message: 'userId does not exist',
                success: false
            })
        }
        next(e)
    }
}

async function deletePost (req, res , next) {
    try {
        const { postId } = req.params;
        const {userId} = req.body;

        if(!userId) {
            return res.status(400).json({ message: 'userId is required', success: false })
        }
        await postservice.deletePost(postId ,userId );
        res.status(200).json({
            message: 'Post deleted successfully' ,
            success: true
        });
    } catch (e) {
        if (e.message === 'Post not found') {
            return res.status(404).json({ message: e.message, success: false })
        }
        if (e.message === 'Not allowed') {
            return res.status(403).json({
                message: 'Only the owner can delete this post',
                success: false
            })
        }
        next(e)
    }
}
async function getAllPostsWithDetails(req, res, next) {
    try {
        const posts = await postservice.getAllPostsWithDetails();
        res.status(200).json({
            message: "success",
            success: true,
            data: posts
        });
    } catch (err) {
        next(err);
    }
}
async function getAllPostsWithCommentCount(req, res, next) {
    try {
        const posts = await postservice.getAllPostsWithCommentCount();
        res.status(200).json({
            message: "success",
            success: true,
            data: posts
        });
    } catch (err) {
        next(err);
    }
}




module.exports = { createPost, deletePost, getAllPostsWithDetails, getAllPostsWithCommentCount };