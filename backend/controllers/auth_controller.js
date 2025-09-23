const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwtController = require("../controllers/jwt_controller");

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      if (!user.isVerified) {
        return res.status(403).json({ message: "User is not verified." });
      }
      if (await bcrypt.compare(password, user.password)) {
        await user.save();
        const accessToken = jwtController.signAccessToken(user);
        await user.save();
        res.header("Authorization", `Bearer ${accessToken}`);
        res.json({ accessToken });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  signup: async (req, res) => {
    try {
      const { name, phoneNo, email, dob, password, q1, q2, q3 } = req.body;
      const user_exists = await User.findOne({ $or: [{ phoneNo }, { email }] });
      if (user_exists) {
        return res.status(400).json({
          error:
            "User with the same phone number or email already exists",
        });
      }
      const hash = await bcrypt.hash(password, 10);
      const new_user = new User({ name, phoneNo, email, dob, password: hash, q1, q2, q3});
      await new_user.save();
      res.status(201).json({ message: "Signup successful" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  profile: async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findOne({ email: decoded.email }).populate("blogs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(400).json({ error: "Error" });
  }
},


  editProfile: async(req, res) => {
    try{
      const { q1, q2, q3 } = req.body;
      const decoded = req.user;
      const user = await User.findOne({ email: decoded.email });
      if(!user) {
        return res.status(404).json({ message: "User not found" })
      }
      if(q1 !== undefined){
        user.q1 = q1;
      }
      if(q2 !== undefined){
        user.q2 = q2;
      }
      if(q3 !== undefined){
        user.q3 = q3;
      }
      await user.save();
      res.status(200).json({message:"user updated successfully"});
    }catch (error){
      res.status(400).json({ error: "Error" });
    }
  }
};

module.exports = authController;