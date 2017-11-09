var studio = angular.module('studio');
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