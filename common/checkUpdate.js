const https = require('https');
const appRoot = require('app-root-path');
const chalk = require('chalk');

const packageJson = require(appRoot.path + "/package.json");

function checkUpdate() {

    const currentVersion = packageJson.version;

    const options = {
        host: 'api.github.com',
        path: '/repos/leehaipei/fake-API/releases/latest',
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
    };

    const request = https.request(options, function (response) {
        let body = '';
        response.on("data", function (chunk) {
            body += chunk.toString('utf8');
        });

        response.on("end", function () {
            const githubInfo = JSON.parse(body);
            const lastVersion = githubInfo.tag_name.slice(1);
            if (compareVersion(lastVersion, currentVersion) > 0) {
                console.log(`📢 new version available~`);
                console.log(`${chalk.yellow(currentVersion)} 👉 ${chalk.green(lastVersion)}`);
                console.log(`🌏 ${chalk.underline(chalk.green(githubInfo.html_url))}`);
            }

        });
    });

    request.end();

}


module.exports = checkUpdate;


function compareVersion(version1, version2) {
    const arr1 = version1.split('.')
    const arr2 = version2.split('.')
    const length1 = arr1.length
    const length2 = arr2.length
    const minlength = Math.min(length1, length2)
    let i = 0
    for (i; i < minlength; i++) {
        let a = parseInt(arr1[i])
        let b = parseInt(arr2[i])
        if (a > b) {
            return 1
        } else if (a < b) {
            return -1
        }
    }
    if (length1 > length2) {
        for (let j = i; j < length1; j++) {
            if (parseInt(arr1[j]) != 0) {
                return 1
            }
        }
        return 0
    } else if (length1 < length2) {
        for (let j = i; j < length2; j++) {
            if (parseInt(arr2[j]) != 0) {
                return -1
            }
        }
        return 0
    }
    return 0
}