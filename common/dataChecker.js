const fs = require('fs');
const chalk = require('chalk');
const fse = require('fs-extra');
const appRoot = require('app-root-path');
const log = console.log;

function dataChecker(req, res, next) {

    const url = req.originalUrl.replace(/\//g, "=").slice(1)

    fs.access(appRoot.path + "/data/" + url + ".js", (err) => {
        if (err) {
            fse.writeFile(appRoot.path + "/data/" + url + ".js",
                `const data = {

}


module.exports = data`
                , (err) => {
                    if (err) {
                        log(`${chalk.bgRed("创建返回数据文件失败")}`);
                        res.json({
                            message: "创建返回数据文件失败"
                        });
                    } else {
                        log(`${chalk.bgGreen("数据文件已创建，请填写返回数据")}`);
                        res.json({
                            message: "数据文件已创建，请填写返回数据"
                        });
                    }
                })
        } else {
            const data = require(appRoot.path + "/data/" + url + ".js")
            const arr = Object.keys(data)
            if (arr.length > 0) {
                next();
            } else {
                log(`${chalk.red("返回数据文件未填写内容")}`);
                res.json({
                    message: "返回数据文件未填写内容"
                });
            }
        }
    })
}

module.exports = dataChecker;
