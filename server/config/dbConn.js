const mongoose = require("mongoose");

const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.DATABASE_URI);
};

module.exports = dbConnect;
