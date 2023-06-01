const moment = require('moment');
const chalk = require('chalk');

const log = console.log;

function logger(req, res, next) {

    log(`${chalk.bgBlue(req.method)} ${chalk.cyan(req.originalUrl)} ${chalk.bgBlack(moment().format('YYYY/MM/DD HH:mm:ss'))}`);

    next();

}

module.exports = logger;
