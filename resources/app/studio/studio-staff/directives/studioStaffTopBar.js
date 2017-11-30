var staff = angular.module('studioStaff');
studio.directive('studioStaffTopBar', [function() {
    return {
        templateUrl: '/app/templates/studioStaffTopBar.html',
        controller: 'StudioStaffViewController'
    };
}]);