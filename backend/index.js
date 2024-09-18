import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes/index.js";

dotenv.config();

const app = express();
const mainRouter = router;
app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(process.env.PORT, () => {
  console.log("App listing on port", process.env.PORT);
});
