"use strict";
var config_1 = require("../common/config");
var config_secret_1 = require("../common/config-secret");
var request = require('request');
module.exports = function (context, callback) {
    var tasksUrl = config_1.config.firebase.databaseURL + "/tasks.json?auth=" + config_secret_1.firebaseSecret;
    var command = context.body;
    console.log("Received command: " + JSON.stringify(command));
    var task = {
        content: command.content,
        created: Date.now()
    };
    var requestOptions = {
        method: 'POST',
        url: tasksUrl,
        json: task
    };
    request(requestOptions, function () { return callback(null, "Finished"); });
};
