var customer = angular.module('studioCustomer', ['ngResource',
                                            'ui.router',
                                            'satellizer',
                                            'ui.calendar',
                                            'shared'
                                            ]);


customer.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    
    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = 'api/auth/customer';
    
    
//    $urlRouterProvider.otherwise('/auth');
        
});

customer.factory('StudioStaff', function($resource) {
    return $resource('api/staff/:id');
});
