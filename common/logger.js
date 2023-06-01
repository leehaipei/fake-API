const moment = require('moment');
const chalk = require('chalk');

const log = console.log;

function logger(req, res, next) {

    log(`${chalk.blue(req.method)} ${chalk.cyan(req.originalUrl.split("?")[0])} ${chalk.bgBlack(moment().format('YYYY/MM/DD HH:mm:ss'))}`);

    next();

}

module.exports = logger;
