const moment = require('moment');

function messageStructure(username, text) {
    return {
    username,
    text,
    time: moment().format('h:mm a')
    }
};

function selfMessage(username, text) {
    return {
    username,
    text,
    time: moment().format('h:mm a')
    }
};


module.exports = messageStructure;
module.exports = selfMessage;