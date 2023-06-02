const readJsonData = require('./readJsonData')

function readData(type, path) {

    let data = undefined

    switch (type) {
        case "json":            
            data = readJsonData(path)
            break;
        case "js":
            data = require(path)
            break;
        default:
            break;
    }


    return data

}


module.exports = readData;