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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var admin = angular.module('masterAdmin', ['ngResource', 'ui.router', 'satellizer']);

admin.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = '/api/auth/studio';

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/templates/login.html',
        controller: 'MasterLoginController'
    }).state('admin', {
        url: '/admin'
    }).state('admin.addStudio', {
        url: '/add-studio',
        templateUrl: 'app/templates/addStudio.html',
        controller: 'MasterStudioController'
    }).state('admin.listStudios', {
        url: '/list-studios',
        templateUrl: 'app/templates/listStudios.html',
        controller: 'MasterStudioController'
    });
});

//Resource Factories

admin.factory('Studio', function ($resource) {
    return $resource('/api/master/studios/:id');
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var studio = angular.module('studio', ['ngResource', 'ui.router', 'satellizer']);

studio.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = '/api/auth/studio';

    $stateProvider.state('studio', {
        url: '/studio/:id',
        templateUrl: 'app/templates/studioIndex.html',
        controller: 'StudioController'
    }).state('studioEdit', {
        url: '/studio/:id/edit',
        templateUrl: 'app/templates/editStudio.html',
        controller: 'StudioAdminController'
    });
});

//Resource Factories

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var app = angular.module('brisbaneLashes', ['masterAdmin', 'studio']);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);