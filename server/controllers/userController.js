const User = require("../models/User");
const bcrypt = require("bcrypt");

//@desc add user
//@route POST /user
//@access PUBLIC
const addUser = async (req, res) => {
  const { username, password, avatar } = req.body;

  // Confirms data
  if (!username || !password || !avatar) {
    return res.status(400).json({ message: "all fields are required" });
  }

  // Check if username is already exist
  const foundUser = await User.findOne({ username: username }).lean();
  if (foundUser) {
    return res.status(409).json({ message: "Duplicate user" });
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // Save user to db
  const result = await User.create({
    username,
    password: hashPassword,
    avatar,
  });
  if (result) {
    res.json({ message: `${result.username} successfully created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

module.exports = {
  addUser,
};
