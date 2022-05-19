import { Schema, model} from "mongoose"

const optionSchema = new Schema({
    name: String,
    votes: {
      type: Number,
      default: 0,
    },
  });

  const voteSchema = new Schema(
    {   
        status: { // 0 si esta en curso, 1 si ha acabado
            type: Number,
            default: 0
        },
        question: {
            type: String,
        },
        options: [optionSchema],
        voted: [
            {
                type: Schema.Types.ObjectId,
                ref:'User'
            }
        ], 
    },
)

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
    poll: {
        question: {
            type: String,
        },
        options: [optionSchema],
        voted: [
            {
                type: Schema.Types.ObjectId,
                ref:'User'
            }
        ], 
    },
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