var admin = angular.module('masterAdmin', ['ngResource',
                                            'ui.router',
                                            'satellizer',
                                            ]);

admin.config(function($stateProvider, $urlRouterProvider, $authProvider){
    
    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = '/api/auth/studio';
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/templates/login.html',
            controller: 'MasterLoginController'
        })
        .state('admin', {
            url: '/admin',
        })
        .state('admin.addStudio', {
            url: '/add-studio',
            templateUrl: 'app/templates/addStudio.html',
            controller: 'MasterStudioController'
        })
        .state('admin.listStudios', {
            url: '/list-studios',
            templateUrl: 'app/templates/listStudios.html',
            controller: 'MasterStudioController'
        })
});

//Resource Factories

admin.factory('Studio', function($resource) {
    return $resource('/api/master/studios/:id');
});