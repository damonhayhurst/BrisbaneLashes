var shared = angular.module('shared');
studio.directive('pageTitle', [function() {
    return {
        templateUrl: '/app/templates/pageTitle.html',
        scope: {
            title : '@',
            subtitle: '@'
        },
        controller: 'PageTitleController'
    };
}]);