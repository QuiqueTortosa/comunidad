import {Schema, model} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    versionKey: false
})

export default model("Category", categorySchema)