import { Schema, model} from "mongoose"

const messageSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: String,
    message: String,
    response: {
        type: String,
        default: ""
    }
},
{
    timestamps: true,
    versionKey: false,
})

export default model("PostMessage",messageSchema)