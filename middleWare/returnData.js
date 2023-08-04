const chalk = require('chalk');

const readData = require('../common/readData')

const { data_mode, latency_time } = require('../config')

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

    if (arr.length > 0) {
        res.FA_DATA = { ...data }
        res.FA_MASSAGE = 'SUCCESS'
        const latencyTime = require('../common/latencyTime')(latency_time)
        res.FA_LATENCYTIME = latencyTime
        setTimeout(() => {
            next();
        }, latencyTime)

    } else {
        console.log(`${chalk.bgMagenta("返回数据文件未填写内容")}`);
        res.FA_MASSAGE = '返回数据文件未填写内容'
        res.FA_DATA = {
            message: "返回数据文件未填写内容",
            file: FA_path.file,
            folderPath: FA_path.folderPath
        }
        next();
    }
}

module.exports = returnData;
