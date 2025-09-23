// Assuming you have a User model already
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  isVerified: {type: Boolean, default: true },
  q1: { type: String, required: true },
  q2: { type: String, required: true },
  q3: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);