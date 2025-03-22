import mongoose from "mongoose";

const db_connection = async () => {
  await mongoose
    .connect("db uri")
    .then(console.log("db connected successfully"))
    .catch((err) => console.log("error while connecting db ", err));
};
