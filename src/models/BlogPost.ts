import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this blog post.'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt for this blog post.'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this blog post.'],
  },
  date: {
    type: String,
    required: [true, 'Please provide a date for this blog post.'],
  },
  author: {
    type: String,
    required: [true, 'Please provide an author for this blog post.'],
  },
  imageId: {
    type: String,
    required: [true, 'Please provide an image ID for this blog post.'],
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Draft',
  },
}, { timestamps: true });

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
