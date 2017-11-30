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
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var shared = angular.module('shared', []);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var admin = angular.module('masterAdmin', ['ngResource', 'ui.router', 'satellizer', 'shared']);

admin.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = 'api/auth/master';
});

//Resource Factories

admin.factory('Studio', function ($resource) {
    return $resource('api/master/studios/:id');
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var customer = angular.module('studioCustomer', ['ngResource', 'ui.router', 'satellizer', 'ui.calendar', 'shared']);

customer.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = 'api/auth/customer';

    //    $urlRouterProvider.otherwise('/auth');
});

customer.factory('StudioStaff', function ($resource) {
    return $resource('api/staff/:id');
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var staff = angular.module('studioStaff', ['ngResource', 'ui.router', 'satellizer', 'ui.calendar', 'shared']);

staff.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = 'api/auth/studio';

    //    $urlRouterProvider.otherwise('/auth');
});

//Resource Factories
staff.factory('Appointment', function ($resource) {
    return $resource('api/appointments/:id');
});

staff.factory('Customer', function ($resource) {
    return $resource('api/customers/:id');
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var studio = angular.module('studio', []);

studio.config(function () {});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

angular.module('brisbaneLashes', ['masterAdmin', 'studio', 'studioStaff', 'studioCustomer', 'shared']);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var app = angular.module('brisbaneLashes');

app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/templates/login.html',
        controller: 'MasterLoginController'
    }).state('admin', {
        url: '/admin',
        abstract: true,
        templateUrl: 'app/templates/masterView.html',
        controller: 'MasterViewController'
    }).state('admin.addStudio', {
        url: '/add-studio',
        templateUrl: 'app/templates/addStudio.html',
        controller: 'MasterAddStudioController'
    }).state('admin.listStudios', {
        url: '/list-studios',
        templateUrl: 'app/templates/listStudios.html',
        controller: 'MasterStudiosController'
    }).state('403', {
        url: '/forbidden',
        templateUrl: 'app/templates/page-403.html'
    }).state('studio', {
        url: '/studio/:id',
        abstract: true,
        template: '<div ui-view class="wrapper"/>',
        controller: 'StudioMainController',
        resolve: {
            studio: function studio($stateParams, $http) {
                return $http.get('api/public/studios/' + $stateParams.id).then(function (resolve) {
                    // promise resolve
                    console.log('Success', resolve.data);
                    return resolve;
                });
            }
        }
    }).state('studio.customerLogin', {
        url: '/customer-login',
        templateUrl: 'app/templates/studioCustomerLogin.html',
        controller: 'StudioCustomerLoginController'
    }).state('studio.staffLogin', {
        url: '/staff-login',
        controller: 'StudioStaffLoginController',
        templateUrl: 'app/templates/studioStaffLogin.html'
    }).state('studio.customer', {
        url: '/customer',
        abstract: true,
        templateUrl: 'app/templates/studioCustomerView.html',
        controller: 'StudioCustomerViewController'
    }).state('studio.customer.bookings', {
        url: '/bookings',
        templateUrl: 'app/templates/studioCustomerBookings.html',
        controller: 'StudioCustomerBookingsController'
    }).state('studio.studioStaff', {
        url: '/staff',
        abstract: true,
        templateUrl: 'app/templates/studioStaffView.html',
        controller: 'StudioStaffViewController'
    }).state('studio.studioStaff.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/templates/studioStaffDashboard.html',
        controller: 'StudioStaffDashboardController'
    }).state('studio.studioStaff.bookings', {
        url: '/bookings',
        templateUrl: 'app/templates/studioStaffBookings.html',
        controller: 'StudioStaffBookingsController'
    }).state('studio.studioStaff.manageCustomers', {
        url: '/customers',
        templateUrl: 'app/templates/studioStaffManageCustomers.html',
        controller: 'StudioStaffManageCustomersController'
    }).state('studio.studioStaff.adminEditStudio', {
        url: '/edit',
        abstract: true,
        template: '<div ui-view/>',
        controller: 'StudioAdminEditController'
    }).state('studio.studioStaff.adminEditStudio.info', {
        url: '/info',
        templateUrl: 'app/templates/studioAdminEditInfo.html',
        controller: 'StudioAdminEditController'
    }).state('studio.studioStaff.adminEditStudio.contact', {
        url: '/contact',
        templateUrl: 'app/templates/studioAdminEditContact.html',
        controller: 'StudioAdminEditController'
    }).state('studio.studioStaff.adminEditStudio.payment', {
        url: '/payment',
        templateUrl: 'app/templates/studioAdminEditPayment.html',
        controller: 'StudioAdminEditController'
    }).state('studio.studioStaff.adminManageStaff', {
        url: '/manage-staff',
        templateUrl: 'app/templates/studioAdminManageStaff.html',
        controller: 'StudioAdminManageStaffController'
    }).state('studio.studioStaff.adminCustomizeTheme', {
        url: '/theme',
        templateUrl: 'app/templates/studioAdminCustomizeTheme.html',
        controller: 'StudioAdminCustomizeThemeController'
    }).state('studio.studioStaff.adminCustomizeEmail', {
        url: '/email',
        templateUrl: 'app/templates/studioAdminCustomizeEmail.html',
        controller: 'StudioAdminCustomizeEmailTemplatesController'
    }).state('studio.studioStaff.manageProfile', {
        url: '/profile',
        templateUrl: 'app/templates/publicProfile.html',
        controller: 'StudioProfileController'
    });
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);