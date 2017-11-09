var admin = angular.module('masterAdmin');
admin.controller('MasterLoginController', ['$scope', '$auth', '$state', 'SatellizerConfig', function($scope, $auth, $state, SatellizerConfig){
    $scope.loginData = {};
    SatellizerConfig.loginUrl = 'api/auth/master'
    $scope.loginSubmit = function(){
        $auth.login($scope.loginData).then(function(data) {
            $state.go('admin.listStudios', {});
        },
                                          function(error) {
            $state.go('403');
        });
    };
}]);