import { Schema, model } from "mongoose";

const optionSchema = new Schema({
    name: String,
    votes: {
      type: Number,
      default: 0,
    },
  });

const voteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        question: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        options: [optionSchema],
        voted: [
            {
                type: Schema.Types.ObjectId,
                ref:'User'
            }
        ],
        status: { // 0 si esta en curso, 1 si ha acabado
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false,
      }
)

export default model("Vote", voteSchema);

