const { logEvents } = require("./logger");

const errHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLogs.log"
  );

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ message: err.message, isError: true });
};

module.exports = errHandler;
