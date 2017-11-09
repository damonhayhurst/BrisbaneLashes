var studio = angular.module('studio');
studio.controller('StudioStaffDashboardController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    var init = function() {
        console.log($('#calendar'));
        $('#calendar').fullCalendar('render');
    };
    init();
}]);