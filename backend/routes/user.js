import { Router } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db.js";
import { signUpSchema, signInSchema, updateUserSchema } from "../validation.js";
import { authMiddleware } from "./middleware.js";

dotenv.config();
const router = Router();

router.post("/signup", async (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  };
  const validation = signUpSchema.safeParse(userData);
  if (!validation.success) {
    return res.status(400).json({ msg: "Incorrect inputs" });
  }

  const data = validation.data;

  try {
    const isUserExist = await User.findOne({ username: data.username });
    if (isUserExist) {
      return res.json({
        msg: "Username already taken",
      });
    }
    data.password = await bcrypt.hash(data.password, 10);
    const user = await User.create(data);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return res
      .status(200)
      .json({ msg: "User created successfully", token: token });
  } catch (error) {
    return res.status(500).json({ msg: "Error while creating user" });
  }
});

router.post("/signin", async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };
  const validation = signInSchema.safeParse(userData);

  if (!validation.success) {
    return res.status(400).json({ msg: "Incorrect inputs" });
  }
  const data = validation.data;

  try {
    const user = await User.findOne({ username: data.username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return res
      .status(200)
      .json({ msg: "Logged in successfully", token: token });
  } catch (error) {
    return res.status(500).json({ msg: "Error while logging in" });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  const validation = updateUserSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(411).json({
      msg: "Error while updating information",
    });
  }
  await User.updateOne(req.body, {
    _id: req.userId,
  });
  return res.json({
    msg: "Information updated successfully",
  });
});

export { router };
