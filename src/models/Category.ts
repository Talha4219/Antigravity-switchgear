import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a category name'],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, 'Please provide a category slug'],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    description: {
        type: String, // Short meta description
        trim: true,
    },
    content: {
        type: String, // Rich HTML/Markdown content
    },
    keywords: {
        type: [String],
        default: [],
    },
    level: {
        type: Number,
        default: 0, // 0 for main, 1 for sub
    },
    parentCategory: {
        type: String, // Slug of parent
        default: null,
    },
    relatedCategories: {
        type: [String], // List of related category slugs
        default: [],
    },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
