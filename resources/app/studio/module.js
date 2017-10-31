var studio = angular.module('studio', ['ngResource',
                                            'ui.router',
                                            'satellizer',
                                            ]);


studio.config(function($stateProvider, $urlRouterProvider, $authProvider){
    
    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = '/api/auth/studio';
    
    $stateProvider
        .state('studio', {
            url: '/studio/:id',
            templateUrl: 'app/templates/studioIndex.html',
            controller: 'StudioController'
        })
        .state('studioEdit', {
            url: '/studio/:id/edit',
            templateUrl: 'app/templates/editStudio.html',
            controller: 'StudioAdminController'
        });
});

//Resource Factories

