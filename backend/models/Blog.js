const mongoose = require('mongoose');
const { Schema } = mongoose;

// Comment sub-schema
const commentSchema = new Schema({
  name: { type: String, required: true, default: 'Anonymous' },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { _id: false });

// Like sub-schema
const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  likedAt: { type: Date, default: Date.now }
}, { _id: false });

// Main Blog schema
const blogSchema = new Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: {
    type: String,
    required: function () {
      return this.status === 'published';
    }
  },
  category: String,
  tags: { type: [String], default: [] },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  readTimeManual: Number,
  views: { type: Number, default: 0 },
  dailyViews: {
  type: [
    {
      date: { type: String }, // e.g., "2025-07-04"
      count: { type: Number, default: 0 },
    },
  ],
  default: [],
},
  likes: { type: [likeSchema], default: [] },
  comments: { type: [commentSchema], default: [] },
  publishedAt: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields
blogSchema.virtual('viewsCount').get(function () {
  return this.views; // views is now a number directly
});
blogSchema.virtual('likesCount').get(function () {
  return this.likes.length;
});
blogSchema.virtual('commentsCount').get(function () {
  return this.comments.length;
});

// Middleware to auto-set publishedAt
blogSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);