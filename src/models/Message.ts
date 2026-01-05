import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this message.'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email for this message.'],
    maxlength: [100, 'Email cannot be more than 100 characters'],
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    enum: ['contact', 'quote', 'newsletter'],
    default: 'contact',
  },
  company: {
    type: String,
  },
  subject: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);

