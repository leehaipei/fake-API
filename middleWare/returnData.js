const chalk = require('chalk');

const readData = require('../common/readData')

const { data_mode } = require('../config')


function returnData(req, res, next) {

    const FA_path = req.FA_path

    const data = readData(data_mode, FA_path.fileAbsolutePath)

    const arr = Object.keys(data)

    if (arr.length > 0) {
        res.json({ ...data });
    } else {
        console.log(`${chalk.bgMagenta("返回数据文件未填写内容")}`);
        res.json({
            message: "返回数据文件未填写内容",
            file: FA_path.file,
            folderPath: FA_path.folderPath
        });
    }

}

module.exports = returnData;
