import { Schema, model} from "mongoose"

const discussionMessageSchema = new Schema({
    discussion: {
        type: Schema.Types.ObjectId,
        ref: 'Discussion'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    message: String,
    response: {
        type: Schema.Types.ObjectId,
        ref: "DiscussionMessage"
    }
},
{
    timestamps: true,
    versionKey: false,
})

export default model("DiscussionMessage",discussionMessageSchema)