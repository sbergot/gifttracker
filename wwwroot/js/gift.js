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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var jquery = __webpack_require__(1);
	var gifturl = "./api/gift";
	function postJson(url, payload) {
	    var settings = {
	        url: url,
	        method: "POST",
	        data: payload,
	        headers: { "Content-Type": "application/json" }
	    };
	    return jquery.ajax(settings);
	}
	function postGift(gift) {
	    return postJson(gifturl, gift);
	}
	function getGifts() {
	    return jquery.getJSON(gifturl);
	}
	function viewGift(gift) {
	    return "\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <dl class=\"dl-horizontal\">\n                <dt>Titre</dt>\n                <dd>" + gift.title + "</dd>\n                <dt>Description</dt>\n                <dd>" + gift.description + "</dd>\n            </dl>\n            <button onclick=\"alert(" + gift.id + ")\">\n                <span class=\"glyphicon glyphicon-pencil\" />\n            </button>\n        </div>\n    </div>\n    ";
	}
	// function
	function renderState(state) {
	    var giftsHtml = state.gifts.map(viewGift).join("");
	    jquery("#gift-list").append(giftsHtml);
	}
	var state = {
	    gifts: []
	};
	getGifts().then(function (response) {
	    if (response === undefined) {
	        return;
	    }
	    state.gifts = response;
	    renderState(state);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ }
/******/ ]);