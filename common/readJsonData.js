
const fs = require('fs-extra');

function readJsonData(path) {
    const _json = fs.readFileSync(path)
    const json = JSON.parse(_json)
    return json

}


module.exports = readJsonData;