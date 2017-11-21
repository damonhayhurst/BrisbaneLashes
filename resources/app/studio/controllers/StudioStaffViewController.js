var studio = angular.module('studio');
studio.controller('StudioStaffViewController', ['$scope', '$state', function($scope, $state) {
    
    $scope.dashboard = function() {
        $state.go('studio.studioStaff.dashboard', {});
    };
    
    $scope.bookings = function() {
        $state.go('studio.studioStaff.bookings', {});
    };
    
    $scope.customers = function() {
        $state.go('studio.studioStaff.manageCustomers', {});
    };
    
    $scope.editInfo = function() {
        $state.go('studio.studioStaff.adminEditStudio.info', {});
    };
    
    $scope.editContact = function() {
        $state.go('studio.studioStaff.adminEditStudio.contact', {});
    };
    
    $scope.editPayment = function() {
        $state.go('studio.studioStaff.adminEditStudio.payment', {});
    };
    
    $scope.manageStaff = function() {
        $state.go('studio.studioStaff.adminManageStaff', {});
    };
    
    $scope.customizeTheme = function() {
        $state.go('studio.studioStaff.adminCustomizeTheme', {});
    };
    
    $scope.customizeEmail = function() {
        $state.go('studio.studioStaff.adminCustomizeEmail', {});
    };
    
    $scope.manageProfile = function() {
        $state.go('studio.studioStaff.manageProfile', {});
    };
    
}]);