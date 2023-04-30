const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message, filename) => {
  const date = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${date}\t${uuid()}\t${message}\n`;

  if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
    await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
  }

  await fsPromise.appendFile(
    path.join(__dirname, "..", "logs", filename),
    logItem
  );
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLogs.log");
  next();
};

module.exports = { logEvents, logger };
