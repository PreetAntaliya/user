const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, phone, password, cpassword, city } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !cpassword ||
      !city 
    ) {
      return res.status(400).json({ error: "Please fill form correct" });
    }

    if (password !== cpassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password not match" });
    }

    const verifyEmail = await User.findOne({ email: email });
    if (verifyEmail) {
      return res
        .status(400)
        .json({ error: "Email already exists in Database" });
    }
    const userCreate = await User.create({
      name,
      email,
      phone,
      password,
      city,
      // profileImg: req.file.path,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userCreate,
    });
  } catch (err) {
    console.error("Error while creating user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "enter valid password" });
    }

    const token = jwt.sign({ payload: user }, "abcd", { expiresIn: "24h" });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const users = async(req,res) => {
    try {
        const user = await User.find({})
        return res.status(200).json({
            success: true,
            message: "User list...",
            data: user,
          });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Admin Auth Error" + err,
        });
      }
}

const deleteUser = async(req,res) => {
    try {
      const id = req.query.id
      console.log(id);
        const user = await User.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "User Deleted...",
          });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Error" + err,
        });
      }
}



const verifyUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Admin Authorised...!",
      data: req.user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Admin Auth Error" + err,
    });
  }
};

module.exports = {
  register,
  login,
  users,
  verifyUser,
  deleteUser
};
