var studio = angular.module('studio');
studio.controller('StudioAdminController', ['$scope', '$stateParams', '$http', '$auth', '$state', 'SatellizerConfig', function($scope, $stateParams, $http, $auth, $state, SatellizerConfig) {
    SatellizerConfig.loginUrl = 'api/auth/studio';
    $scope.studioData = {};
    
    $http.get('/api/studios/' + $stateParams.id).then(
        function(response) {
            $scope.studioData = response.data;
        }
    );
    
    $scope.update = function(){
        $http.put('/api/studios/' + $stateParams.id, $scope.studioData).then(
            function successCallback(response) {
                $scope.studioData = response.data;
            }
        );
    };
    
}]);