import mongoose from "mongoose";

const userSchemaDetails = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const userSchema = new mongoose.Schema(userSchemaDetails, { timestamps: true });

export default mongoose.model("user", userSchema);
