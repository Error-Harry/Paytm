import { Router } from "express";
import { authMiddleware } from "./middleware.js";
import { Account } from "../db.js";
import { moneyTransferSchema } from "../validation.js";
import mongoose from "mongoose";

const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
  console.log(req);
  const account = await Account.findOne({
    userId: req.userId,
  });
  return res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const validation = moneyTransferSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ msg: "Invalid inputs" });
    }

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || account.balance < req.body.amount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: req.body.to }).session(
      session
    );
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Invalid account" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -req.body.amount } }
    ).session(session);

    await Account.updateOne(
      { userId: req.body.to },
      { $inc: { balance: req.body.amount } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.json({ msg: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transfer failed:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

export { router };
