var studio = angular.module('studio');
studio.controller('StudioMainController', ['$scope', '$state', '$stateParams', '$http',  'SatellizerConfig', function($scope, $state, $stateParams, $http, SatellizerConfig) {
    
    SatellizerConfig.loginUrl = 'api/auth/studio';
    $scope.studioData = {};
    
    $http.get('api/public/studios/' + $stateParams.id).then(
        function(response) {
            $scope.studioData = response.data;
        }
//        function(error) {
//            $state.go('403');
//            console.log(error);
//        }
    );

}]);