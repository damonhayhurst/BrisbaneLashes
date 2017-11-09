var studio = angular.module('studio');
studio.controller('StudioLoginController', ['$scope', '$stateParams', '$http', '$auth', '$state', 'SatellizerConfig', function($scope, $stateParams, $http, $auth, $state, SatellizerConfig) {
    
    $scope.loginSubmit = function() {
        $auth.login($scope.loginData).then(function(data) {
            $state.go('studio.studioStaff.dashboard', {});
        },
        function(error) {
            $state.go('403');
        })
    };
    
}]);