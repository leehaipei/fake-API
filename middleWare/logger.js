const moment = require('moment');
const chalk = require('chalk');

const log = console.log;
const baseUrl = require('../common/baseUrl')

function logger(req, res, next) {

    log(`${chalk.blue(req.method)} ${chalk.cyan(baseUrl(req.originalUrl))} ${chalk.bgBlack(moment().format('YYYY/MM/DD HH:mm:ss'))}`);

    next();

}

module.exports = logger;
