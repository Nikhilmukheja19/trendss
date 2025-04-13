import validator from "validator";
import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if (!user) {
      res.json({ success: false, message: "User Doesn't Exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Internal Server Error" });
  }
};

//Route for User Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Checking User Exist Or Not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a Valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a Strong Password",
      });
    }
    //Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for Admin Login
const adminLogin = async (req, res) => {
  "07:09:00"
};

export { loginUser, registerUser, adminLogin };
