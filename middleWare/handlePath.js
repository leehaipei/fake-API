const appRoot = require('app-root-path');

const baseUrl = require('../common/baseUrl')

const { data_mode, data_folder_name } = require('../config')


function handlePath(req, res, next) {

    const url = baseUrl(req.originalUrl)
    const fileName = url.replace(/\//g, "=").slice(1)
    const file = fileName + "." + data_mode
    const appRootPath = appRoot.path
    const dataFilePath = appRootPath + "/" + data_folder_name + "/"
    const fileAbsolutePath = dataFilePath + file
    const folderPath = dataFilePath.replace(/\\/g, "/")

    req.FA_path = {
        baseUrl: url,
        fileName,
        file,
        fileAbsolutePath,
        folderPath,
        appRootPath,
        dataFilePath
    }

    next();

}

module.exports = handlePath;
