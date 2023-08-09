var nodemon = require('nodemon');
const chalk = require('chalk');

var checkUpdate = require('../common/checkUpdate');
checkUpdate();


nodemon({ script: './bin/www' })
    .on('start', function () {
        console.log(`${chalk.hex('#FF0000')('f')}${chalk.hex('#FF7F00')('a')}${chalk.hex('#FFFF00')('k')}${chalk.hex('#00FF00')('e')} ${chalk.hex('#00FFFF')('A')}${chalk.hex('#0000FF')('P')}${chalk.hex('#8B00FF')('I')} ${chalk.gray('is')} ${chalk.bold.green('ready')}`);
    })
