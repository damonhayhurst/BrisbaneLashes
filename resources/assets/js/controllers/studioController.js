angular.module('brisbaneLashes').controller('studioController', function($scope, $http, Studio) {
    $scope.studioData = {}
    
    $scope.get = function(id) {
        Studio.get(id)
            .success(function(data) {
                $scope.studio = data;
        });
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
    
})