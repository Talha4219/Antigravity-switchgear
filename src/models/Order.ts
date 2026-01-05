import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Please provide a customer name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
    },
    phone: {
        type: String,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        productName: String,
        quantity: {
            type: Number,
            default: 1,
        }
    }],
    totalAmount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    message: String,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
