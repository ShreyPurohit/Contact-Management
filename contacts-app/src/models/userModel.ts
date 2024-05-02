import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please Enter User Name"]
        },
        email: {
            type: String,
            required: [true, "Please Enter Email Address"],
            unique: [true, "Email Already Exists"]
        },
        password: {
            type: String,
            require: [true, "Please Enter Password"]
        }
    },
    {
        timestamps: true
    }
)

const User = model("User",userSchema)

export default User