const logger = (req, res, next) => {
    const oldSend = res.send;
    const oldEnd = res.end;

    res.send = function (body) {
        console.log(`${new Date()}\t${req.method}\t${req.originalUrl}\tRequest Body: ${JSON.stringify(req.body)}\tResponse Body: ${body}`);
        oldSend.call(this, body);
    };

    res.end = function (body) {
        // Log for responses that use .end() (like DELETE 204)
        console.log(`${new Date()}\t${req.method}\t${req.originalUrl}\tRequest Body: ${JSON.stringify(req.body)}\tResponse Body: ${body || ''}`);
        oldEnd.call(this, body);
    };

    next();
};

module.exports = logger;