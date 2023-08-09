const https = require('https');
const appRoot = require('app-root-path');
const chalk = require('chalk');

function checkUpdate() {

    const { check_update } = require(appRoot.path + "/config.js");


    if (check_update) {
        const packageJson = require(appRoot.path + "/package.json");
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
                if (lastVersion !== currentVersion) {
                    console.log(`📢 new version available~`);
                    console.log(`${chalk.yellow(currentVersion)} 👉 ${chalk.green(lastVersion)}`);
                    console.log(`🌏 ${chalk.underline(chalk.green(githubInfo.html_url))}`);
                }

            });
        });

        request.end();

    }

}


module.exports = checkUpdate;