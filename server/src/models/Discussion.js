import { Schema, model} from "mongoose"

const discussionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true
    },
    poll: [{
        type: Schema.Types.ObjectId,
        ref: "Vote"
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "DiscussionMessage"
      }],
},
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model("Discussion",discussionSchema)