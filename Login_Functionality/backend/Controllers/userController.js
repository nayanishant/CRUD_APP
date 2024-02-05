const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const dotenv = require("dotenv").config();

// Register controller
const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).send("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    return res.status(201).send({
      message: "User created successfully.",
    });
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// Login controller
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).send({ error: "User not found" });
    }

    const isPswdCorrect = await bcrypt.compare(password, userExists.password);
    if (!isPswdCorrect) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { email: userExists.email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY }
    );

    // Use httpOnly to make the token inaccessible to JavaScript
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in loginHandler:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
