import express from "express";
import User from "../Models/UserModel.js";
//import bcrypt, { hash, hashSync } from "bcrypt";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utils.js";
const userRouter = express.Router();

userRouter.post("/singin", async (req, res) => {
  const { email, password } = req.body;
  let passs = password.toString;
  console.log("email", email);
  const user = await User.findOne({ email });
  console.log(user);
  bcrypt.hash(password, 8, (err, hashedPassword) => {
    if (err) {
      return err;
    }

    if (user) {
      if (bcrypt.compare(password, hashedPassword, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "invalid email or  password " });
  });
});

export default userRouter;
