import mongoose, { Schema } from "mongoose"

const ResetSchema = new Schema({
    token: {
        type: String,
    },

}, { timestamps: true })

export default mongoose.model("Reset Token", ResetSchema)
