var studio = angular.module('studio');
studio.directive('topBar', [function() {
    return {
        templateUrl: '/app/templates/topBar.html',
        controller: 'StudioStaffViewController'
    };
}]);