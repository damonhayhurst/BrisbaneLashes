var staff = angular.module('studioStaff', ['ngResource',
                                            'ui.router',
                                            'satellizer',
                                            'ui.calendar',
                                            'shared'
                                            ]);


staff.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    
    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = 'api/auth/studio';
    
    
//    $urlRouterProvider.otherwise('/auth');
        
});

//Resource Factories
staff.factory('Appointment', function($resource) {
    return $resource('api/appointments/:id');
});

staff.factory('Customer', function($resource) {
    return $resource('api/customers/:id');
});
