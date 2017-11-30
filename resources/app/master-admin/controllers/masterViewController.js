var master = angular.module('masterAdmin');
master.controller('MasterViewController', ['$scope', '$state', function($scope, $state) {
    
    $scope.addStudio = function() {
        $state.go('admin.addStudio');
    };
    
    $scope.listStudios = function() {
        $state.go('admin.listStudios');
    };
}]);