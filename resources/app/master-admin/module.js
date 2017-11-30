var admin = angular.module('masterAdmin', ['ngResource',
                                            'ui.router',
                                            'satellizer',
                                           'shared'
                                            ]);

admin.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    
    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = 'api/auth/master';
    
    
});

//Resource Factories

admin.factory('Studio', function($resource) {
    return $resource('api/master/studios/:id');
});