var customer = angular.module('studioCustomer');
customer.controller('StudioCustomerViewController', ['$scope', '$state', function($scope, $state) {
    
    $scope.bookings = function() {
        $state.go('studio.customer.bookings', {});
    };
    
    $scope.editPayment = function() {
        $state.go('studio.customer.payment', {});
    };
    
}]);