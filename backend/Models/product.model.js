import mongoose, { Schema } from "mongoose"

const ProductSchema = new Schema({
    name: {
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
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;
