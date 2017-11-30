var customer = angular.module('studioCustomer');
customer.directive('studioCustomerLeftSideBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/studioCustomerLeftSideBar.html',
        controller: 'StudioCustomerViewController'
    };
}]);