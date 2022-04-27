import { Schema, model} from "mongoose"

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    selectedFile: {
        type:String,
        default: ""
      },
    post:{
        type: String,
        required: true,
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "PostMessage"
      }],
},
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model("Post",postSchema)