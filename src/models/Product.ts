import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this product.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  shortDescription: {
    type: String,
    // required: [true, 'Please provide a short description.'], // Optional for now
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this product.'],
  },
  specs: {
    type: String,
    required: [true, 'Please provide specifications for this product.'],
  },
  applications: {
    type: [String],
    required: [true, 'Please provide applications for this product.'],
  },
  imageId: {
    type: String,
    required: [true, 'Please provide an image ID/URL for this product.'],
  },
  category: {
    type: String,
    index: true,
  },
  subCategory: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  }
}, { timestamps: true });

// Pre-save hook to generate slug from title if not provided
ProductSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

export interface Product extends mongoose.Document {
  title: string;
  shortDescription?: string;
  description: string;
  specs: string;
  applications: string[];
  imageId: string;
  category?: string;
  subCategory?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export default mongoose.models.Product || mongoose.model<Product>('Product', ProductSchema);
