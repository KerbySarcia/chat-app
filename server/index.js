require("dotenv").config();
require("express-async-errors");

const path = require("path");
const http = require("http");
const Group = require("./models/Group");

//custom middleware
const { logger, logEvents } = require("./middleware/logger");
const errHandler = require("./middleware/errHandler");

// Third Party modules
const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const dbConnect = require("./config/dbConn");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// config
const corsOptions = require("./config/corsOptions");

dbConnect();

app.use(logger);
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Create Server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5173", null],
    methods: ["POST", "GET"],
  },
});

//Routes
app.use("/", require("./routers/indexRouter"));
app.use("/auth", require("./routers/authRouter"));
app.use("/users", require("./routers/userRouter"));
app.use("/groups", require("./routers/groupRouter"));

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data);
  });

  socket.on("send-message", async (data, callback) => {
    const { groupName, text, avatar, time, name } = data;

    const group = await Group.findOne({ name: groupName }).exec();

    group.messages.push({ text, avatar, time, name });
    await group.save();

    socket.to(groupName).emit("room-message", data);
  });
});

//404
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MONGODB");
  server.listen(3500, () => {
    console.log("SERVER RUNNING ON 3500");
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
