var admin = angular.module('masterAdmin');
admin.controller('MasterStudiosController', ['$scope', '$http', 'Studio', 'SatellizerConfig', '$state', function($scope, $http, Studio, SatellizerConfig, $state) {
    SatellizerConfig.loginUrl = 'api/auth/master';
    $scope.studioData = {}
    $scope.studios = Studio.query();
    
    
    $scope.delete = function(id) {
        Studio.destroy(id)
            .success(function(data) {
                
            });
    };
    
    $scope.viewPublic = function(id) {
        $state.go('studio', {id: id});
    }
    
    
}]);