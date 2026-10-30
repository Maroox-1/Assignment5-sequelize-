const postRepository = require('./post.repository')

async function createPost (title , content , userId){
    const post = await postRepository.createPost(title , content , userId)
    return post
}


async function deletePost (postId , userId ){
    const post = await postRepository.findPostById(postId);
    if(!post) throw new Error ('Post not found')
    if( post.userId !== Number(userId) ){
        throw new Error ('Not allowed')
    }
    await postRepository.deletePost(postId);
}
async function getAllPostsWithDetails() {
    return await postRepository.findAllPostsWithDetails();
}
async function getAllPostsWithCommentCount() {
    return await postRepository.findAllPostsWithCommentCount();
}


module.exports = {
    createPost,
    deletePost,
    getAllPostsWithDetails,
    getAllPostsWithCommentCount
};