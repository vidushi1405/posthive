const express = require('express');
const router = express.Router();
const { verifyAccessToken, verifyAdmin } = require('../middlewares/jwtMiddleware'); // Correct import

const blogController = require('../controllers/blog_controller');

router.post('/create', verifyAccessToken, blogController.createBlog);
router.get('/all', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id/content', verifyAccessToken, blogController.updateBlogContent);
router.post('/:id/comment', blogController.addComment);
router.post('/:id/like', verifyAccessToken, blogController.likeBlog);
router.put('/:id/edit', verifyAccessToken, blogController.editBlog);
router.delete('/:id', verifyAccessToken, blogController.deleteBlog);

// Admin route to delete any blog
router.delete('/admin/:id', verifyAccessToken, verifyAdmin, blogController.adminDeleteBlog);

module.exports = router;