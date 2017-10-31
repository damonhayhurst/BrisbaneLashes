var studio = angular.module('studio');
studio.controller('StudioController', ['$scope', '$stateParams', '$http', '$auth', '$state', 'SatellizerConfig', function($scope, $stateParams, $http, $auth, $state, SatellizerConfig) {
    SatellizerConfig.loginUrl = 'api/auth/studio';
    $scope.studioData = {};
    
    $http.get('/api/public/studios/' + $stateParams.id).then(
        function(response) {
            $scope.studioData = response.data;
        }
    );
    
    $scope.loginSubmit = function(){
        $scope.loginData['studio_id'] = $stateParams.id; 
        $auth.login($scope.loginData).then(function(data) {
            $state.go('studioEdit', {id: $stateParams.id});
        });
    };
    
}]);