import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    selectedFile: {
      type:String,
      default: ""
    },
    polls: [{
      type: Schema.Types.ObjectId,
      ref: "Vote"
    }],
    messages:[{
      type: Schema.Types.ObjectId,
      ref: "PostMessage"
    }],
    posts:[{
      type: Schema.Types.ObjectId,
      ref: "Post"
    }],
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//userSchema.pre('save'function) Realiza la funcion antes de guardar

//Los nombres son nuestros
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model("User", userSchema);