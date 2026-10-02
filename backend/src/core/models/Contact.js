import mongoose from "mongoose";

const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mensaje: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
