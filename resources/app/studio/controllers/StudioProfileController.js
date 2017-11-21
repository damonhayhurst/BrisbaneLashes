var studio = angular.module('studio');
studio.controller('StudioProfileController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    $scope.uiConfig = {
        calendar:{
            editable: true
        }
    };
}]);