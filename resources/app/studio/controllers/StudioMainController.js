var studio = angular.module('studio');
studio.controller('StudioMainController', ['$scope', '$state', '$stateParams', '$http',  'SatellizerConfig', 'studio', function($scope, $state, $stateParams, $http, SatellizerConfig, studio) {
    
    $scope.studioData = studio.data;

}]);