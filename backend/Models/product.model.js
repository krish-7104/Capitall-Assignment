const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['sold', 'unsold'],
        default: 'unsold',
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    image: {
        type: String,
        required: false,
        default: "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
    },
    location: {
        type: Object,
        required: true,
        properties: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
    },
    soldAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
