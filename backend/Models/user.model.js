import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    purchases: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    listedProduct: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
