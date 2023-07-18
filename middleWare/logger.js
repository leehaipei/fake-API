const moment = require('moment');
const chalk = require('chalk');

function logger(req, res, next) {
    var diff = process.hrtime(req.startAt)
    var time = diff[0] * 1e3 + diff[1] * 1e-6

    console.log(`${chalk.blue(req.method)} ${chalk.cyan(req.FA_path.baseUrl)} ${chalk.bgGray(time.toFixed(3) + 'ms')} ${chalk.bgBlack(moment().format('YYYY/MM/DD HH:mm:ss'))}`);

    res.json({ ...res.FA_DATA });
}

module.exports = logger;
