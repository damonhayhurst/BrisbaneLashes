var admin = angular.module('masterAdmin');
admin.controller('MasterLoginController', ['$scope', '$auth', '$state', 'SatellizerConfig', function($scope, $auth, $state, SatellizerConfig){
    $scope.loginData = {};
    SatellizerConfig.loginUrl = 'api/auth/master'
    $scope.loginSubmit = function(){
        $auth.login($scope.loginData).then(function(data) {
            $state.go('admin.listStudios', {});
        });
    };
}]);
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