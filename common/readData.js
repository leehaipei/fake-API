const readJsonData = require('./readJsonData')

function readData(type, path, params) {

    let data = undefined

    switch (type) {
        case "json":
            data = readJsonData(path)
            break;
        case "js":
            const dataFun = require(path)
            data = dataFun(params)
            break;
        default:
            break;
    }


    return data

}


module.exports = readData;