const fs = require('fs');
const appRoot = require('app-root-path');
const chalk = require('chalk');

function checkConfig() {

    return new Promise((resolve, reject) => {

        fs.access(appRoot.path + "/config.js", (err) => {
            if (err) {
                console.log(`${chalk.bgRed("未找到配置文件，请按config-template.js创建config.js")}`);
                reject()
            } else {
                resolve()
            }
        })
    })

}


module.exports = checkConfig;