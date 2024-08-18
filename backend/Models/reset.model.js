const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResetSchema = new Schema({
    token: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Reset Token", ResetSchema);
