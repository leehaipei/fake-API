const chalk = require('chalk');
const appRoot = require('app-root-path');
const log = console.log;

function returnData(req, res, next) {

    const url = req.originalUrl.replace(/\//g, "=").slice(1)

    const data = require(appRoot.path + "/data/" + url + ".js")
    const arr = Object.keys(data)
    if (arr.length > 0) {
        res.json({ ...data });
    } else {
        log(`${chalk.red("返回数据文件未填写内容")}`);
        res.json({
            message: "返回数据文件未填写内容"
        });
    }

}

module.exports = returnData;
