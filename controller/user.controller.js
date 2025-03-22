import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send({
        success: false,
        message: "Please filled all feilds",
      });
    }

    const checkUserExist = await userModel.findOne({ email });
    if (checkUserExist) {
      return res.send({
        success: false,
        message: "user already exist .",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashpassword,
    });

    await newUser.save();

    const token = await jwt.sign(
      { _id: newUser._id },
      process.env.TOKEN_SECRET_KEY
    );

    if (!token) {
      return res.send({
        success: false,
        message: "Token is not created yet",
      });
    }

    return res
      .cookie("token", token, {
        maxAge: 360000,
        httpOnly: true,
      })
      .send({
        success: true,
        message: "User created successfully.",
      });
  } catch (error) {
    console.log("while singup getting ",error);
    
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        success: false,
        message: "Please filled all feilds",
      });
    }

    const checkUserExist = await userModel.findOne({ email });
    if (!checkUserExist) {
      return res.send({
        success: false,
        message: "user does not exist .",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkUserExist.password
    );

    if (!checkPassword) {
      return res.send({
        success: false,
        message: "Either email or password is wrong !",
      });
    }

    const token = await jwt.sign(
      {
        id: checkUserExist._id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    if (!token) {
      return res.send({
        success: false,
        message: "Internal server error token not genrated.",
      });
    }

    return res
      .cookie("token", token, {
        maxAge: "3600000",
        httpOnly: true,
      })
      .send({
        success: true,
        message: "User login successfully.",
      });
  } catch (error) {
    console.log("Erorr while login user ",error);
    
  }
};

const userController = {
  signUp,
  login,
};

export default userController;
