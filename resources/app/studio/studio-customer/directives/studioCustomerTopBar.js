var customer = angular.module('studioCustomer');
customer.directive('studioCustomerTopBar', [function() {
    return {
        templateUrl: '/app/templates/studioCustomerTopBar.html',
        controller: 'CustomerViewController'
    };
}]);