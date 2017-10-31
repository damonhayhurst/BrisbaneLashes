var admin = angular.module('masterAdmin');
admin.controller('MasterStudioController', ['$scope', '$http', 'Studio', 'SatellizerConfig', '$state', function($scope, $http, Studio, SatellizerConfig, $state) {
    SatellizerConfig.loginUrl = 'api/auth/master';
    $scope.studioData = {}
    $scope.studios = Studio.query();
    
    $scope.get = function(id) {
        Studio.get(id, (function(data) {
                $scope.studio = data;
        }));
    };
    
    $scope.submit = function() {
        Studio.save($scope.studioData)
            .success(function(data) {
                console.log(":))");
            })
            .error(function(data) {
                console.log(data);
            });
    };
    
    $scope.delete = function(id) {
        Studio.destroy(id)
            .success(function(data) {
                
            });
    };
    
    $scope.viewPublic = function(id) {
        $state.go('studio', {id: id});
    }
    
}]);