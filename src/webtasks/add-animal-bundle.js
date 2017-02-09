module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config_1 = __webpack_require__(1);
	var config_secret_1 = __webpack_require__(2);
	var request = __webpack_require__(3);
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
	    request(requestOptions, function () {
	        return callback(null, "Finished");
	    });
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.config = {
	    addTaskUrl: "https://wt-webdev-appell-com-0.run.webtask.io/add-task-bundle",
	    addAnimalUrl: "https://wt-webdev-appell-com-0.run.webtask.io/add-task-bundle",
	    firebase: {
	        apiKey: "AIzaSyBHUHIFoL9iaUL9URgmwQSDhxb25FNaS74",
	        authDomain: "gold-river-reptile.firebaseapp.com",
	        databaseURL: "https://gold-river-reptile.firebaseio.com/",
	        storageBucket: ""
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.firebaseSecret = "HGVX9yGCyvJyrANBcd4rNsUj8ilDWLCbD5RndDam";

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ }
/******/ ]);