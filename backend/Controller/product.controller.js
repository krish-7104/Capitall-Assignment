
import Product from "../Models/product.model.js";
import ApiResponse from "../utils/ApiResponse.js";

export const CreateProductHandler = async (req, res) => {
    try {
        const { name, price, seller, image, location } = req.body;
        const product = await Product.create({ name, price, seller, image, location });
        res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const GetProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('seller').populate('buyer');
        if (!product) {
            return res.status(404).json(new ApiResponse(404, null, "Product not found"));
        }
        res.status(200).json(new ApiResponse(200, product, "Product get successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const UpdateProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, status, buyer } = req.body;
        const product = await Product.findByIdAndUpdate(
            id,
            { name, price, status, buyer },
            { new: true, runValidators: true }
        ).populate('seller').populate('buyer');
        if (!product) {
            return res.status(404).json(new ApiResponse(404, null, "Product not found"));
        }
        res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const DeleteProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json(new ApiResponse(404, null, "Product not found"));
        }
        res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const GetProductsHandler = async (req, res) => {
    try {
        const products = await Product.find().populate('seller').populate('buyer');
        res.status(200).json(new ApiResponse(200, products, "Products get successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};
