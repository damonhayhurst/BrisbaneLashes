var app = angular.module('brisbaneLashes');

app.config(function($stateProvider){
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/templates/login.html',
            controller: 'MasterLoginController'
        })
        .state('admin', {
            url: '/admin',
            abstract: true,
            templateUrl: 'app/templates/masterView.html',
            controller: 'MasterViewController'
        })
        .state('admin.addStudio', {
            url: '/add-studio',
            templateUrl: 'app/templates/addStudio.html',
            controller: 'MasterAddStudioController'
        })
        .state('admin.listStudios', {
            url: '/list-studios',
            templateUrl: 'app/templates/listStudios.html',
            controller: 'MasterStudiosController'
        })
        .state('403', {
            url: '/forbidden',
            templateUrl: 'app/templates/page-403.html'
        })
        .state('studio', {
            url: '/studio/:id',
            abstract: true,
            template: '<div ui-view class="wrapper"/>',
            controller: 'StudioMainController',
            resolve: {
                studio: function($stateParams, $http) {
                    return $http.get('api/public/studios/' + $stateParams.id).then(
                        (resolve) => {   // promise resolve
                            console.log('Success',resolve.data);
                            return resolve;
                        }
                    );
                }
            }
        })               
        .state('studio.customerLogin', {
            url: '/customer-login',
            templateUrl: 'app/templates/studioCustomerLogin.html',
            controller: 'StudioCustomerLoginController'
        })
        .state('studio.staffLogin', {
            url: '/staff-login',
            controller: 'StudioStaffLoginController',
            templateUrl: 'app/templates/studioStaffLogin.html'
        })
        .state('studio.customer', {
            url: '/customer',
            abstract: true,
            templateUrl: 'app/templates/studioCustomerView.html',
            controller: 'StudioCustomerViewController'
        })
        .state('studio.customer.bookings', {
            url: '/bookings',
            templateUrl: 'app/templates/studioCustomerBookings.html',
            controller: 'StudioCustomerBookingsController'
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
            templateUrl: 'app/templates/publicProfile.html',
            controller: 'StudioProfileController'
        });
    
});