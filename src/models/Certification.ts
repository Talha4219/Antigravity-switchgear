import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this certification.'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  issuingBody: {
    type: String,
    required: [true, 'Please provide an issuing body for this certification.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this certification.'],
  },
  imageId: {
    type: String,
    required: [true, 'Please provide an image ID for this certification.'],
  },
}, { timestamps: true });

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
