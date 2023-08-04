function latencyTime(object) {
    switch (object.constructor.name) {
        case "Boolean":
            if (object) {
                return 666
            } else {
                return 0
            }
        case "Object":
            if (object.max && object.min) {
                return getRandomNumberBetween(object.min, object.max)
            } else {
                return getRandomNumberBetween(0, 666)
            }
        case "Array":
            return getRandomNumberBetween(Math.min(...object), Math.max(...object))
        default:
            return 0;
    }
}

module.exports = latencyTime;


function getRandomNumberBetween(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    const randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);
}