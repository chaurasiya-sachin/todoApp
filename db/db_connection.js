import mongoose from "mongoose";
import "dotenv/config.js"

export const db_connection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(console.log("db connected successfully"))
    .catch((err) => console.log("error while connecting db ", err));
};
