const moment = require('moment');
const chalk = require('chalk');

function logger(req, res, next) {

    console.log(`${chalk.blue(req.method)} ${chalk.cyan(req.FA_path.baseUrl)} ${chalk.bgBlack(moment().format('YYYY/MM/DD HH:mm:ss'))}`);

    next();

}

module.exports = logger;
