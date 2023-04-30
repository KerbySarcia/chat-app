const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// @desc login user
// @route POST /auth
// @access PUBLIC
const login = async (req, res) => {
  const { username, password } = req.body;

  // Confirms data if exist
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and Password are required" });
  }

  // Check if username is exist
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check password if match
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Create Access Token
  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        role: foundUser.role,
        avatar: foundUser.avatar,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );

  // Create Refresh Token
  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

// @desc refresh
// @route GET /auth/refresh
// @access Public
const refresh = (req, res) => {
  const cookies = req.cookies;

  // Check the jwt if exist
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Check if user exist
      const foundUser = await User.findOne({
        username: decoded.username,
      }).lean();
      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const accessToken = jwt.sign(
        {
          userInfo: {
            username: foundUser.username,
            role: foundUser.role,
            avatar: foundUser.avatar,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public
const logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({ message: "Cookie Cleared" });
};

module.exports = {
  login,
  logout,
  refresh,
};
