
function dataTemplate(type) {

    let template = ''

    switch (type) {
        case "json":
            template = `{ }`
            break;

        case "js":
            template = `const data = {

}
            
            
module.exports = data`
            break;

        default:
            break;
    }

    return template

}


module.exports = dataTemplate;