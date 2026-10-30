const post = require('../common/db/post.model');
const user = require('../common/db/user.model');
const comment = require('../common/db/comment.model');
const { fn, col } = require('sequelize');

async function createPost(title , content , userId) {
    const Post = new post ({
        title,
        content,
        userId
    })
    await Post.save();
    return Post;
}

async function findPostById(postId) {
    const Post = await post.findByPk(postId);
    return Post;
}

async function deletePost(id) {
    await post.destroy({where : {id : id}});
}
async function findAllPostsWithDetails() {
    const Posts = await post.findAll({
        attributes: ['id', 'title'],
        include: [
            {
                model: user,
                attributes: ['id', 'name']
            },
            {
                model: comment,
                attributes: ['id', 'content']
            }
        ]
    });
    return Posts;
}
async function findAllPostsWithCommentCount() {
    const Posts = await post.findAll({
        attributes: [
            'id',
            'title',
            [fn('COUNT', col('comments.id')), 'commentCount']
        ],
        include: [
            {
                model: comment,
                attributes: []
            }
        ],
        group: ['post.id']
    });
    return Posts;
}

module.exports = {
    createPost,
    findPostById,
    deletePost,
    findAllPostsWithDetails,
    findAllPostsWithCommentCount
};