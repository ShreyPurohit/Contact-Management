import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please Add Contact"]
    },
    email: {
        type: String,
        required: [true, "Please Add Email Address"]
    },
    phone: {
        type: String,
        required: [true, "Please Add Phone Number"]
    }
}, {
    timestamps: true
});

const contact = model("Contact", contactSchema)

export default contact