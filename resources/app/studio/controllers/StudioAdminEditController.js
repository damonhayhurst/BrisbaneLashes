var studio = angular.module('studio');
studio.controller('StudioAdminEditController', ['$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams) {
    
    $scope.studioData = {}
    
    $http.get('api/public/studios/' + $stateParams.id).then(
        function(response) {
            $scope.studioData = response.data;
        }
    );
    
    $scope.update = function(){
        $http.put('api/studios/' + $stateParams.id, $scope.studioData).then(
            function successCallback(response) {
                $scope.studioData = response.data;
                $state.go('studio', {id: $stateParams.id});
            }
        );
    };

}]);