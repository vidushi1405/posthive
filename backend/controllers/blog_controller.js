const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require('mongoose');

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const blogController = {
  // Create blog
  createBlog: async (req, res) => {
    try {
      const {
        title,
        excerpt = '',
        content = '',
        category,
        tags = [],
        status = 'draft',
        readTimeManual,
      } = req.body;

      if (!title) return res.status(400).json({ message: 'Title is required.' });

      const newBlog = new Blog({
        title,
        excerpt,
        content,
        category,
        tags,
        status,
        readTimeManual: readTimeManual || (content ? Math.ceil(content.length / 500) : undefined),
        author: req.user._id
      });

      await newBlog.save();
      await User.findByIdAndUpdate(req.user._id, { $push: { blogs: newBlog._id } });

      res.status(201).json(newBlog);
    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Public: Get all published blogs
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find({ status: 'published' }).populate('author', 'name email');
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get blog by ID with view tracking
 getBlogById: async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name username avatar');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Increment total views
    blog.views = (blog.views || 0) + 1;

    // Track dailyViews
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const existingEntry = blog.dailyViews.find(entry => entry.date === today);

    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      blog.dailyViews.push({ date: today, count: 1 });
    }

    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
},

  // Update content/status
  updateBlogContent: async (req, res) => {
    try {
      // Validate ObjectId format
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid blog ID format' });
      }

      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      if (String(blog.author) !== String(req.user._id))
        return res.status(403).json({ message: 'Unauthorized' });

      const { content, status } = req.body;
      if (status === 'published' && (!content || content.trim() === ''))
        return res.status(400).json({ message: 'Content is required to publish' });

      blog.content = content || blog.content;
      blog.status = status || blog.status;

      await blog.save();
      res.status(200).json({ message: 'Blog updated', blog });
    } catch (err) {
      console.error('Error updating blog:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Add a comment
  addComment: async (req, res) => {
    try {
      // Validate ObjectId format
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid blog ID format' });
      }

      const { name = 'Anonymous', text } = req.body;
      if (!text || text.trim() === '')
        return res.status(400).json({ message: 'Comment text is required' });

      // Ensure name is provided and not empty
      const commentName = name && name.trim() !== '' ? name.trim() : 'Anonymous';

      const blog = await Blog.findOneAndUpdate(
        { _id: req.params.id },
        { 
          $push: { 
            comments: { 
              name: commentName, 
              text: text.trim(), 
              date: new Date() 
            } 
          } 
        },
        { new: true, runValidators: true }
      );

      if (!blog) return res.status(404).json({ message: 'Blog not found' });

      res.status(201).json({ message: 'Comment added', comments: blog.comments });
    } catch (err) {
      console.error('Error adding comment:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Like a blog
  likeBlog: async (req, res) => {
    try {
      // Validate ObjectId format
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid blog ID format' });
      }

      // Check if user already liked this blog
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });

      const alreadyLiked = blog.likes.some(
        (like) => String(like.user) === String(req.user._id)
      );
      if (alreadyLiked) {
        return res.status(400).json({ message: 'You already liked this blog' });
      }

      // Ensure user name is available
      const userName = req.user.name || req.user.username || req.user.email || 'Anonymous User';

      const updatedBlog = await Blog.findOneAndUpdate(
        { _id: req.params.id },
        { 
          $push: { 
            likes: {
              user: req.user._id,
              name: userName,
              likedAt: new Date()
            }
          } 
        },
        { new: true, runValidators: true }
      );

      res.status(200).json({ message: 'Blog liked', likes: updatedBlog.likes.length });
    } catch (err) {
      console.error('Error liking blog:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
  editBlog: async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!isValidObjectId(blogId)) {
      return res.status(400).json({ message: 'Invalid blog ID format' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (String(blog.author) !== String(req.user._id))
      return res.status(403).json({ message: 'Unauthorized' });

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      status,
      readTimeManual,
    } = req.body;

    if (status === 'published' && (!content || content.trim() === ''))
      return res.status(400).json({ message: 'Content is required to publish' });

    if (title) blog.title = title;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (category) blog.category = category;
    if (tags) blog.tags = tags;
    if (status) blog.status = status;
    if (readTimeManual !== undefined) blog.readTimeManual = readTimeManual;

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error("Error editing blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
},
deleteBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      if (!isValidObjectId(blogId)) {
        return res.status(400).json({ message: 'Invalid blog ID format' });
      }

      const blog = await Blog.findById(blogId);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });

      // Ensure the user is the author of the blog
      if (String(blog.author) !== String(req.user._id)) {
        return res.status(403).json({ message: 'Unauthorized: You are not the author of this blog.' });
      }

      // Remove blog from user's blog list
      await User.findByIdAndUpdate(req.user._id, { $pull: { blogs: blog._id } });

      // Delete the blog
      await Blog.deleteOne({ _id: blogId });

      res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (err) {
      console.error('Error deleting blog:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // NEW: Admin function to delete any blog
  adminDeleteBlog: async (req, res) => {
    try {
        const blogId = req.params.id;
        if (!isValidObjectId(blogId)) {
            return res.status(400).json({ message: 'Invalid blog ID format' });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Remove blog from the original author's blog list
        await User.findByIdAndUpdate(blog.author, { $pull: { blogs: blogId } });

        // Delete the blog
        await Blog.deleteOne({ _id: blogId });

        res.status(200).json({ message: 'Blog deleted successfully by admin.' });
    } catch (err) {
        console.error('Error deleting blog by admin:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
};

module.exports = blogController;