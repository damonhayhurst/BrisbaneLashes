var studio = angular.module('studio');
studio.directive('leftSideBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/leftSideBar.html',
        controller: 'StudioStaffViewController'
    };
}]);