const moment = require('moment');
const chalk = require('chalk');
const fs = require('fs');
const XLSX = require('xlsx');

const { record_mode, record_folder_name, record_file_name } = require('../config')

function logger(req, res, next) {

    res.json({ ...res.FA_DATA });

    const diff = process.hrtime(req.startAt)
    const time = diff[0] * 1e3 + diff[1] * 1e-6
    const resTime = time.toFixed(3) + 'ms'
    const now = moment();

    console.log(`${chalk.blue(req.method)} ${chalk.cyan(req.FA_path.baseUrl)} ${chalk.white(resTime)} ${chalk.gray(now.format('YYYY/MM/DD HH:mm:ss'))} ${chalk.green(req.ip)}`);


    const appRootPath = req.FA_path.appRootPath;
    const dataFilePath = appRootPath + "/" + record_folder_name + "/"
    const fileAbsolutePath = dataFilePath + record_file_name + ".xlsx"

    if (record_mode === 'excel') {
        fs.access(fileAbsolutePath, (err) => {
            if (err) {
                if (!fs.existsSync(dataFilePath)) {
                    fs.mkdirSync(dataFilePath);
                }
                const workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.aoa_to_sheet([
                    [
                        '请求路径(request URL)',
                        '请求方式(request method)',
                        '响应时间(response time)',
                        '响应结果(response result)',
                        '请求时间(request time)',
                        '请求IP(request IP)'
                    ]
                ]);

                worksheet['!cols'] = [
                    { wpx: 30 },
                    { wpx: 10 },
                    { wpx: 10 },
                    { wpx: 15 },
                    { wpx: 20 }
                ];
                XLSX.utils.book_append_sheet(workbook, worksheet, 'record');
                XLSX.writeFile(workbook, fileAbsolutePath);
                console.log(`${chalk.bgGreen("记录excel已创建")} ${chalk.bgGreen(fileAbsolutePath.replace(/\\/g, "/"))}`);
            } else {
                // 读取excel文件
                const workbook = XLSX.readFile(fileAbsolutePath);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                // 添加新行的数据
                const newRowData = [
                    req.FA_path.baseUrl,
                    req.method,
                    resTime,
                    res.FA_MASSAGE,
                    now.format('YYYY/MM/DD HH:mm:ss'),
                    req.ip
                ];
                // 寻找最后一行的索引
                let lastRowIndex = 2; // 第一行是表头，从第三行开始添加新行
                while (worksheet[`A${lastRowIndex}`]) {
                    lastRowIndex++;
                }
                // 插入新行
                const newRow = XLSX.utils.sheet_add_aoa(worksheet, [newRowData], { origin: -1 });
                // 更新excel文件
                const newWorkbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(newWorkbook, newRow, workbook.SheetNames[0]);
                XLSX.writeFile(newWorkbook, fileAbsolutePath);
            }
        })
    }

}

module.exports = logger;
