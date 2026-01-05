import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this offer.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this offer.'],
  },
  discount: {
    type: String,
    required: [true, 'Please provide a discount for this offer.'],
  },
  validUntil: {
    type: String,
    required: [true, 'Please provide a valid until date for this offer.'],
  },
}, { timestamps: true });

export default mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
