
function dataTemplate(type) {

    let template = ''

    switch (type) {
        case "json":
            template = `{ }`
            break;

        case "js":
            template = `const data = params => {

    let returnData = {}
            
// 此处可使用params参数对返回数据returnData进行处理
            
    return returnData
}
            
            
module.exports = data`
            break;

        default:
            break;
    }

    return template

}


module.exports = dataTemplate;