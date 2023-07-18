const chalk = require('chalk');

const readData = require('../common/readData')

const { data_mode } = require('../config')


function returnData(req, res, next) {

    let params = {}

    switch (req.method) {
        case 'GET':
            params = req.query
            break;
        case 'POST':
            params = req.body
            break;
        case 'PUT':
            params = req.body
            break;
        case 'DELETE':
            params = req.query
            break;
        default:
            break;
    }


    const FA_path = req.FA_path

    const data = readData(data_mode, FA_path.fileAbsolutePath, params)

    const arr = Object.keys(data)

    var startAt = process.hrtime()
    var diff = process.hrtime(startAt)
    var time = diff[0] * 1e3 + diff[1] * 1e-6
    console.log(time);

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
