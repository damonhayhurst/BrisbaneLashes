var staff = angular.module('studioStaff');
staff.directive('studioStaffLeftSideBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/StudioStaffLeftSideBar.html',
        controller: 'StudioStaffViewController'
    };
}]);