import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
const app = express();
const salt = bcrypt.genSaltSync(10);
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://qsf44lynn:fZDFH3iCicIMD9Gr@cluster0.tmzi6fx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passOK = bcrypt.compareSync(password,userDoc.password)
    res.json(passOK)
  } catch (error) {}
});
//mongodb+srv://qsf44lynn:fZDFH3iCicIMD9Gr@cluster0.tmzi6fx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.listen(4000, () => {
  console.log("listening port 4000");
});
