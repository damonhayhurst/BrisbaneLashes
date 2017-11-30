var staff = angular.module('studioStaff');
staff.controller('StudioStaffLoginController', ['$scope', '$stateParams', '$http', '$auth', '$state', function($scope, $stateParams, $http, $auth, $state) {
    
    
    
    $scope.loginSubmit = function() {
        $auth.login($scope.loginData).then(function(data) {
            $state.go('studio.studioStaff.dashboard', {});
        },
        function(error) {
            $state.go('403');
        })
    };
    
}]);