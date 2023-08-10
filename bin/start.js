var nodemon = require('nodemon');
const chalk = require('chalk');

const readyStr = 'fake API';

var checkUpdate = require('../common/checkUpdate');
checkUpdate();


nodemon({ script: './bin/www' })
    .on('start', function () {

        let logger = ''

        for (let i = 0; i < readyStr.length; i++) {
            const color = '#' + Math.random().toString(16).substr(2, 6);
            logger += chalk.bold.hex(color)(readyStr[i])
        }
        logger += chalk.green(' is ready')
        console.log(logger);
    })
