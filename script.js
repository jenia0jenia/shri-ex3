/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./data/input.json":
/*!*************************!*\
  !*** ./data/input.json ***!
  \*************************/
/*! exports provided: devices, rates, maxPower, default */
/***/ (function(module) {

eval("module.exports = {\"devices\":[{\"id\":\"F972B82BA56A70CC579945773B6866FB\",\"name\":\"Посудомоечная машина\",\"power\":950,\"duration\":3,\"mode\":\"night\"},{\"id\":\"C515D887EDBBE669B2FDAC62F571E9E9\",\"name\":\"Духовка\",\"power\":2000,\"duration\":2,\"mode\":\"day\"},{\"id\":\"02DDD23A85DADDD71198305330CC386D\",\"name\":\"Холодильник\",\"power\":50,\"duration\":24},{\"id\":\"1E6276CC231716FE8EE8BC908486D41E\",\"name\":\"Термостат\",\"power\":50,\"duration\":24},{\"id\":\"7D9DC84AD110500D284B33C82FE6E85E\",\"name\":\"Кондиционер\",\"power\":850,\"duration\":1}],\"rates\":[{\"from\":7,\"to\":10,\"value\":6.46},{\"from\":10,\"to\":17,\"value\":5.38},{\"from\":17,\"to\":21,\"value\":6.46},{\"from\":21,\"to\":23,\"value\":5.38},{\"from\":23,\"to\":7,\"value\":1.79}],\"maxPower\":2100};\n\n//# sourceURL=webpack:///./data/input.json?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/input */ \"./data/input.json\");\nvar _data_input__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data/input */ \"./data/input.json\", 1);\n\n\ndoSmart(_data_input__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction doSmart(input) {\n    checkInput(input);\n\n    const DAY_LENGTH    = 24,\n          DAY_MODE      = 'day',\n          DAY_START     = 7,\n          DAY_END       = 21,\n          NIGHT_MODE    = 'night',\n          NIGHT_START   = 21,\n          NIGHT_END     = 7,\n          KILOWATT      = 1000,\n          ROUND_TO      = 10000;\n\n    let output = {\n            schedule: {},\n            consumedEnergy: {\n                value: 0,\n                devices: {}\n            }\n        },\n        devices  = input.devices,\n        rates    = input.rates,\n        maxPower = input.maxPower,\n        dayPower = getDayPower(maxPower),\n        dayTarif = getDayTarif(rates);\n\n    sortDevices(devices);\n\n    for (let i = 0; i < devices.length; i ++) {\n        let spendBest    = NaN, \n            dayPowerBest = dayPower.slice(0, dayPower.length), \n            scheduleBest = {},\n            start        = 0,\n            end          = DAY_LENGTH,\n            dayLength;\n\n        if (devices[i].mode == DAY_MODE) {\n            start = DAY_START;\n            end = DAY_END;\n        } else if (devices[i].mode == NIGHT_MODE) {\n            start = NIGHT_START;\n            end = NIGHT_END;\n        }\n\n        if (start <= end) {\n            dayLength = end - start;\n        } else if (start > end) {\n            dayLength = DAY_LENGTH - start + end;\n        }\n\n        if (devices[i].mode == NIGHT_MODE || devices[i].mode == DAY_MODE) {\n            dayLength -= devices[i].duration;\n        }\n\n        for (let hour = start; dayLength > 0; hour ++, dayLength --) {\n            let state      = dayPower.slice(0, dayPower.length),\n                schedule   = {},\n                spend      = 0,\n                isPossible = true;\n\n            if (hour == DAY_LENGTH) {\n                hour = 0;\n            }\n\n            for (let curHour = hour, iteration = 0; iteration < devices[i].duration; curHour ++, iteration ++) {\n                if (curHour == DAY_LENGTH) {\n                    curHour = 0;\n                }\n\n                spend += dayTarif[curHour] * devices[i].power / KILOWATT;\n\n                if ( (state[curHour] - devices[i].power < 0) ) {\n                    isPossible = false;\n                    break;\n                }\n\n                state[curHour] -= devices[i].power;\n                schedule[curHour] = devices[i].id;\n            }\n\n            if (isPossible) {\n                if (isNaN(spendBest) || spend < spendBest) {\n                    spendBest = spend;\n                    dayPowerBest = state.slice(0, state.length);\n                    scheduleBest = {};\n\n                    for (let hour in schedule) {\n                        scheduleBest[hour] = schedule[hour];\n                    }\n                }\n            }\n        }\n\n        if (isNaN(spendBest))\n            throw Error('NaN error');\n\n        dayPower = dayPowerBest.slice(0, dayPowerBest.length);\n        output.consumedEnergy.value += spendBest;\n        spendBest = Math.round(spendBest * ROUND_TO) / ROUND_TO;\n        output.consumedEnergy.devices[devices[i].id] = spendBest;\n\n        for (let hour in scheduleBest) {\n            if (typeof output.schedule[hour] == 'undefined') {\n                output.schedule[hour] = [];\n            }\n\n            output.schedule[hour].push(scheduleBest[hour]);\n        }\n    }\n\n    output.consumedEnergy.value = Math.round(output.consumedEnergy.value * ROUND_TO) / ROUND_TO;\n    console.log(output);\n    return output;\n\n    function getDayPower(maxPower) {\n        let day = [];\n        for (let i = 0; i < DAY_LENGTH; i ++) {\n            day[i] = maxPower;\n        }\n\n        return day;\n    }\n\n    function getDayTarif(rates) {\n        let tarif = [];\n        for (let i = 0; i < DAY_LENGTH; i ++) {\n            tarif[i] = getTarifByHour(i, rates);\n        }\n\n        return tarif;\n    }\n\n    function getTarifByHour(hour, rates)  {\n        for (let i = 0; i < rates.length; i ++) {\n            if (rates[i].from < rates[i].to) {\n                if (hour >= rates[i].from && hour < rates[i].to) {\n                    return rates[i].value;\n                }\n            } else if (rates[i].from > rates[i].to) {\n                if (hour >= rates[i].from || hour < rates[i].to)\n                    return rates[i].value;\n            } else if (rates[i].from == rates[i].to && rates[i].from == hour) {\n                    return rates[i].value;\n            }\n        }\n\n        return 0;\n    }\n\n    function sortDevices(devices) {\n        for (let i = 0; i < devices.length; i ++) {\n            for (let j = i + 1; j < devices.length; j ++) {\n                if (devices[i].duration < devices[j].duration) {\n                    let tmp = devices[i];\n                    devices[i] = devices[j];\n                    devices[j] = tmp;\n                }\n            }\n        }\n    }\n\n    function checkInput(input) {\n        for (let i = 0; i < input.devices.length; i ++) {\n            if (\n                input.devices[i].duration < 0 \n                || typeof input.devices[i].duration == 'undefined'\n                || input.devices[i].power < 0\n                || typeof input.devices[i].power == 'undefined'\n                || typeof input.devices[i].name == 'undefined'\n                || typeof input.devices[i].id == 'undefined'\n            ) {\n                throw Error('devices input error');\n            }\n        }\n\n        for (let i = 0; i < input.rates.length; i ++) {\n            if (\n                input.rates[i].from < 0 \n                || typeof input.rates[i].from == 'undefined'\n                || input.rates[i].to < 0\n                || typeof input.rates[i].to == 'undefined'\n                || typeof input.rates[i].value == 'undefined'\n            ) {\n                throw Error('rates input error');\n            }\n        }\n        if (typeof input.maxPower == 'undefined') {\n                throw Error('rates input error');\n            }\n    }\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });