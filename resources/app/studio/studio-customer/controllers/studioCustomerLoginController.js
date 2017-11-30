var customer = angular.module('studioCustomer');
customer.controller('StudioCustomerLoginController', ['$scope', '$stateParams', '$http', '$auth', '$state', function($scope, $stateParams, $http, $auth, $state) {
    
    $scope.loginSubmit = function() {
        $scope.loginData.studioId = $stateParams.id;
        $auth.login($scope.loginData).then(function(data) {
            $state.go('studio.customer.bookings', {});
        },
        function(error) {
            $state.go('403');
        })
    };
    
}]);