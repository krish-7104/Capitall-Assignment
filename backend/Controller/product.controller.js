import Product from "../Models/product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../Models/user.model.js"

export const CreateProductHandler = async (req, res) => {
    try {
        const { title, description, price, seller, image, location } = req.body;

        const product = await Product.create({ title, description, price, seller, image, location });

        await User.findByIdAndUpdate(
            seller,
            { $push: { listedProduct: product._id } },
            { new: true }
        );

        res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const GetProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .lean()
            .populate({
                path: 'seller',
                select: '-password -purchases -createdAt -updatedAt',
            })
            .populate({
                path: 'buyer',
                select: '-password -purchases -createdAt -updatedAt',
            })
            .exec();
        if (!product) {
            return res.status(404).json(new ApiResponse(404, null, "Product not found"));
        }
        res.status(200).json(new ApiResponse(200, product, "Product retrieved successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const UpdateProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, seller, image, location, buyer, status, soldAt } = req.body;
        const product = await Product.findByIdAndUpdate(
            id,
            { title, description, price, seller, image, location, buyer, status, soldAt },
            { new: true, runValidators: true }
        )
            .populate({
                path: 'seller',
                select: '-password -purchases -createdAt -updatedAt',
            })
            .populate({
                path: 'buyer',
                select: '-password -purchases -createdAt -updatedAt',
            });
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
        const { search } = req.query;

        const query = {
            // status: "unsold",
        };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        const products = await Product.find(query)
            .sort({ updatedAt: -1 })
            .lean()
            .populate({
                path: 'seller',
                select: '-password -purchases -createdAt -updatedAt',
            })
            .populate({
                path: 'buyer',
                select: '-password -purchases -createdAt -updatedAt',
            })
            .exec();

        res.status(200).json(new ApiResponse(200, products, "Products retrieved successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};


export const BuyProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            {
                status: "sold",
                buyer: userId,
                soldAt: new Date()
            },
            { new: true, runValidators: true }
        )
            .populate({
                path: 'seller',
                select: '-password -purchases -createdAt -updatedAt',
            })
            .populate({
                path: 'buyer',
                select: '-password -purchases -createdAt -updatedAt',
            });

        if (!product) {
            return res.status(404).json(new ApiResponse(404, null, "Product not found"));
        }

        await User.findByIdAndUpdate(
            userId,
            { $push: { purchases: product._id } },
            { new: true }
        );

        res.status(200).json(new ApiResponse(200, product, "Product purchased successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};