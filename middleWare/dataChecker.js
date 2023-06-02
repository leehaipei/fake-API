const fs = require('fs');
const chalk = require('chalk');
const fse = require('fs-extra');
const appRoot = require('app-root-path');

const log = console.log;
const baseUrl = require('../common/baseUrl')
const dataTemplate = require('../common/dataTemplate')

const { data_mode } = require('../config')

function dataChecker(req, res, next) {

    const url = baseUrl(req.originalUrl).replace(/\//g, "=").slice(1)
    const path = appRoot.path + "/data/" + url + "." + data_mode
    const _path = (appRoot.path + "/data/").replace(/\\/g, "/")

    fs.access(path, (err) => {
        if (err) {
            fse.writeFile(path, dataTemplate(data_mode), (err) => {
                if (err) {
                    log(`${chalk.bgRed("创建返回数据文件失败")}`);
                    res.json({
                        message: "创建返回数据文件失败",
                        path: _path,
                        file: url + "." + data_mode
                    });
                } else {
                    log(`${chalk.bgGreen("数据文件已创建，请填写返回数据")}`);
                    res.json({
                        message: "数据文件已创建，请填写返回数据",
                        path: _path,
                        file: url + "." + data_mode
                    });
                }
            })
        } else {
            next();
        }
    })
}

module.exports = dataChecker;
