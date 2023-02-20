import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import Jsonwebtoken from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = Jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log(user);
    let dbuser = await User.findOneAndUpdate(
      { email: user.email },
      {
        ask: req.body.ask.anchorKey,
        agedate: req.body.agedate,
        agemonth: req.body.agemonth,
        ageyear: req.body.ageyear,
        gender: req.body.gender.anchorKey,
        army: req.body.army.anchorKey,
      }
    );

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
