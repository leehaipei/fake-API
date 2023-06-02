const fs = require('fs');
const chalk = require('chalk');
const fse = require('fs-extra');

const dataTemplate = require('../common/dataTemplate')

const { data_mode } = require('../config')

function dataChecker(req, res, next) {

    const FA_path = req.FA_path

    fs.access(FA_path.fileAbsolutePath, (err) => {
        if (err) {
            fse.writeFile(FA_path.fileAbsolutePath, dataTemplate(data_mode), (err) => {
                if (err) {
                    console.log(`${chalk.bgRed("创建返回数据文件失败")}`);
                    res.json({
                        message: "创建返回数据文件失败",
                        file: FA_path.file,
                        folderPath: FA_path.folderPath
                    });
                } else {
                    console.log(`${chalk.bgGreen("数据文件已创建，请填写返回数据")}`);
                    res.json({
                        message: "数据文件已创建，请填写返回数据",
                        file: FA_path.file,
                        folderPath: FA_path.folderPath
                    });
                }
            })
        } else {
            next();
        }
    })
}

module.exports = dataChecker;
