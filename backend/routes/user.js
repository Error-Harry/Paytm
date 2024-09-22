import { Router } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Account, User } from "../db.js";
import { signUpSchema, signInSchema, updateUserSchema } from "../validation.js";
import { authMiddleware } from "./middleware.js";

dotenv.config();
const router = Router();

router.post("/signup", async (req, res) => {
  const validation = signUpSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ msg: "Invalid input format." });
  }

  try {
    const isUserExist = await User.findOne({
      username: validation.data.username,
    });
    if (isUserExist) {
      return res.status(409).json({ msg: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    const user = await User.create({
      ...validation.data,
      password: hashedPassword,
    });

    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.status(201).json({ msg: "User created successfully!", token });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  const validation = signInSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ msg: "Invalid input format." });
  }

  try {
    const user = await User.findOne({ username: validation.data.username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      validation.data.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ msg: "Logged in successfully!", token });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  const validation = updateUserSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ msg: "Error while updating information" });
  }

  try {
    await User.updateOne(
      { _id: req.userId },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }
    );
    return res.json({ msg: "Information updated successfully" });
  } catch (error) {
    console.error("Error updating user info:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/updatePassword", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstName: { $regex: `.*${filter}.*`, $options: "i" } },
      { lastName: { $regex: `.*${filter}.*`, $options: "i" } },
    ],
  });
  return res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/userInfo", authMiddleware, async (req, res) => {
  const userId = req.query.id || req.userId;
  const users = await User.findOne({ _id: userId });
  if (!users) {
    return res.status(404).json({ msg: "User not found" });
  }
  return res.json({
    firstName: users.firstName,
    lastName: users.lastName,
    username: users.username,
  });
});

export { router };
