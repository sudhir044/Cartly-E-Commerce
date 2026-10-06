import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: ture
    },
    email: {
        type: String,
        require: ture,
        unique: ture
    },
    role: {
        type: String,
        enum: [user, admin],
        default: 'user'

    },
    varified: {
        type: Boolean,
        default: false
    }

})

module.export = mongoose.model("User", userShema);