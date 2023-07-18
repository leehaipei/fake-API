function startTiming(req, res, next) {
    req.startAt = process.hrtime();
    next();
}

module.exports = startTiming;
