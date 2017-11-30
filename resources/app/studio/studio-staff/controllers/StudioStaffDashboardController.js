var staff = angular.module('studioStaff');
staff.controller('StudioStaffDashboardController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    $scope.uiConfig = {
        calendar:{
            editable: true
        }
    };
}]);