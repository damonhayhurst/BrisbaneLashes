var studio = angular.module('studio', ['ngResource',
                                            'ui.router',
                                            'satellizer'
                                            ]);


studio.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    
    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = 'api/auth/studio';
    
    $stateProvider
        .state('studio', {
            url: '/studio/:id',
            abstract: true,
            template: '<div ui-view class="wrapper"/>',
            controller: 'StudioMainController'
        })
        .state('studio.login', {
            url: '/login',
            templateUrl: 'app/templates/studioLogin.html',
            controller: 'StudioLoginController'
        })
        .state('studio.studioStaff', {
            url: '/staff',
            abstract: true,
            templateUrl: 'app/templates/studioStaffView.html',
            controller: 'StudioStaffViewController'
        })
        .state('studio.studioStaff.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/templates/studioStaffDashboard.html',
            controller: 'StudioStaffDashboardController'
        })
        .state('studio.studioStaff.bookings', {
            url: '/bookings',
            templateUrl: 'app/templates/studioStaffBookings.html',
            controller: 'StudioStaffBookingsController'
        })
        .state('studio.studioStaff.manageCustomers', {
            url: '/customers',
            templateUrl: 'app/templates/studioStaffManageCustomers.html',
            controller: 'StudioStaffManageCustomersController'
        })
        .state('studio.studioStaff.adminEditStudio', {
            url: '/edit',
            abstract: true,
            template: '<div ui-view/>',
            controller: 'StudioAdminEditController'
        })
        .state('studio.studioStaff.adminEditStudio.info', {
            url: '/info',
            templateUrl: 'app/templates/studioAdminEditInfo.html',
            controller: 'StudioAdminEditController'
        })
        .state('studio.studioStaff.adminEditStudio.contact', {
            url: '/contact',
            templateUrl: 'app/templates/studioAdminEditContact.html',
            controller: 'StudioAdminEditController'
        })
        .state('studio.studioStaff.adminEditStudio.payment', {
            url: '/payment',
            templateUrl: 'app/templates/studioAdminEditPayment.html',
            controller: 'StudioAdminEditController'
        })
        .state('studio.studioStaff.adminManageStaff', {
            url: '/manage-staff',
            templateUrl: 'app/templates/studioAdminManageStaff.html',
            controller: 'StudioAdminManageStaffController'
        })
        .state('studio.studioStaff.adminCustomizeTheme', {
            url: '/theme',
            templateUrl: 'app/templates/studioAdminCustomizeTheme.html',
            controller: 'StudioAdminCustomizeThemeController'
        })
        .state('studio.studioStaff.adminCustomizeEmail', {
            url: '/email',
            templateUrl: 'app/templates/studioAdminCustomizeEmail.html',
            controller: 'StudioAdminCustomizeEmailTemplatesController'
        })
        .state('studio.studioStaff.manageProfile', {
            url: '/profile',
            templateUrl: 'app/templates/studioStaffManageProfile.html',
            controller: 'StudioStaffManageProfileController'
        })
});

//Resource Factories

