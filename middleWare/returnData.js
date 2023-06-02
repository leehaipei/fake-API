const chalk = require('chalk');
const appRoot = require('app-root-path');

const log = console.log;
const baseUrl = require('../common/baseUrl')
const readData = require('../common/readData')

const { data_mode } = require('../config')


function returnData(req, res, next) {

    const url = baseUrl(req.originalUrl).replace(/\//g, "=").slice(1)
    const path = appRoot.path + "/data/" + url + "." + data_mode
    const _path = (appRoot.path + "/data/").replace(/\\/g, "/")

    const data = readData(data_mode, path)

    const arr = Object.keys(data)

    if (arr.length > 0) {
        res.json({ ...data });
    } else {
        log(`${chalk.bgMagenta("返回数据文件未填写内容")}`);
        res.json({
            message: "返回数据文件未填写内容",
            path: _path,
            file: url + "." + data_mode
        });
    }

}

module.exports = returnData;
