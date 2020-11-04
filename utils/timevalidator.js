function timeValidation(time) {
    var p = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    var matches = time.match(p);
    if(matches){
        return true;
    }
    return false;
}

module.exports = {timeValidation};