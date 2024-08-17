import ResetToken from "../models/reset.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/ApiResponse.js";
import { sendMail } from "../utils/MailHelper.js";
import User from "../Models/user.model.js";

const generateToken = (user, expiry) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: expiry });
};

const generateResponse = (user) => {
    return { _id: user._id, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt, name: user.name }
}

export const GetUserAccountDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
            .populate({
                path: 'listedProduct',
                select: '-__v',
                populate: {
                    path: 'seller',
                    select: '-password -purchases -createdAt -updatedAt'
                }
            })
            .populate({
                path: 'purchases',
                select: '-__v',
                populate: {
                    path: 'seller',
                    select: '-password -purchases -createdAt -updatedAt'
                }
            })
            .exec();

        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, "User not found"));
        }

        const userDetails = {
            name: user.name,
            email: user.email,
            listedProducts: user.listedProduct,
            purchasedProducts: user.purchases
        };

        res.status(200).json(new ApiResponse(200, userDetails, "User account details retrieved successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};
export const RegisterHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let user = await User.findOne({ email })
        if (user) {
            res.status(409).json(new ApiResponse(409, null, "User Already Exists"));
            return
        } else {
            user = await User.create({ name, email, password });
            const token = generateToken(user, "7d");
            const response = generateResponse(user);
            res.cookie('token', token, {
                httpOnly: false, secure: true,
                sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000
            }); res.status(201).json(new ApiResponse(201, response, "User registered successfully"));
        }
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const LoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await user.isPasswordCorrect(password)) {
            return res.status(401).json(new ApiResponse(401, null, "Invalid credentials"));
        }
        const token = generateToken(user, "7d");
        res.cookie('token', token, {
            httpOnly: false, secure: true,
            sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const response = generateResponse(user);
        res.status(200).json(new ApiResponse(200, response, "Login successful"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const GetUserHandler = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json(new ApiResponse(401, null, "Unauthorized: Missing or invalid token"));
        }
        const token = authorizationHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json(new ApiResponse(404, null, "User not found"));
            }
            const response = generateResponse(user);
            return res.status(200).json(new ApiResponse(200, response, "User retrieved successfully"));
        } catch (err) {
            console.error("Error decoding token:", err.message);
            return res.status(401).json(new ApiResponse(401, null, "Unauthorized: Invalid token"));
        }
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
};

export const ForgetPasswordHandler = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, 'User not found'));
        }
        const token = generateToken(user, "1h");
        const resetToken = new ResetToken({ token });
        await resetToken.save();
        sendMail(user.email, resetToken._id);
        return res.status(200).json(new ApiResponse(200, null, 'Reset password email sent'));
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json(new ApiResponse(500, null, 'Internal server error'));
    }
};

export const UpdatePasswordHandler = async (req, res) => {
    const { token, password } = req.body;
    try {
        if (!token) {
            return res.status(404).json(new ApiResponse(404, null, 'Token not found'));
        }
        const resetTokenData = await ResetToken.findById(token);
        if (!resetTokenData) {
            return res.status(404).json(new ApiResponse(404, null, 'Token not found'));
        }
        try {
            const tokenData = jwt.verify(resetTokenData.token, process.env.JWT_SECRET);
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(tokenData.id, { password: hashedPassword });
            await ResetToken.findByIdAndDelete(token);
            return res.status(200).json(new ApiResponse(200, null, 'Password updated successfully'));
        } catch (error) {
            console.error('Error verifying JWT:', error);
            return res.status(401).json(new ApiResponse(401, null, 'Invalid Token'));
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json(new ApiResponse(500, null, 'Internal server error'));
    }
};


export const LogoutHandler = (req, res) => {
    res.cookie('token', '', { httpOnly: false, maxAge: 0 });
    return res.status(200).json(new ApiResponse(200, null, "Logout successful"));
};