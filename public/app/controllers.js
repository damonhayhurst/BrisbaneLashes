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
        Studio.save($scope.studioData).$promise.then(
            function successCallback() {
                $state.go('admin.listStudios');
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
    
    $scope.add = function() {
        $state.go('admin.addStudio');
    }
    
}]);
var studio = angular.module('studio');
studio.controller('PageTitleController', [function($scope, $state) {
}]);
var studio = angular.module('studio');
studio.controller('StudioAdminCustomizeEmailTemplatesController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
var studio = angular.module('studio');
studio.controller('StudioAdminCustomizeThemeController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
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
var studio = angular.module('studio');
studio.controller('StudioAdminManageStaffController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
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
var studio = angular.module('studio');
studio.controller('StudioStaffBookingsController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
var studio = angular.module('studio');
studio.controller('StudioStaffDashboardController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    var init = function() {
        console.log($('#calendar'));
        $('#calendar').fullCalendar('render');
    };
    init();
}]);
var studio = angular.module('studio');
studio.controller('StudioStaffManageCustomersController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
var studio = angular.module('studio');
studio.controller('StudioStaffViewController', ['$scope', '$state', function($scope, $state) {
    
    $scope.dashboard = function() {
        $state.go('studio.studioStaff.dashboard', {});
        setTimeout(function () {
            $('#calendar').fullCalendar('render');
        }, 300); // Set enough time to wait until animation finishes;
    };
    
    $scope.bookings = function() {
        $state.go('studio.studioStaff.bookings', {});
    };
    
    $scope.customers = function() {
        $state.go('studio.studioStaff.manageCustomers', {});
    };
    
    $scope.editInfo = function() {
        $state.go('studio.studioStaff.adminEditStudio.info', {});
    };
    
    $scope.editContact = function() {
        $state.go('studio.studioStaff.adminEditStudio.contact', {});
    };
    
    $scope.editPayment = function() {
        $state.go('studio.studioStaff.adminEditStudio.payment', {});
    };
    
    $scope.manageStaff = function() {
        $state.go('studio.studioStaff.adminManageStaff', {});
    };
    
    $scope.customizeTheme = function() {
        $state.go('studio.studioStaff.adminCustomizeTheme', {});
    };
    
    $scope.customizeEmail = function() {
        $state.go('studio.studioStaff.adminCustomizeEmail', {});
    };
    
    $scope.manageProfile = function() {
        $state.go('studio.studioStaff.manageProfile', {});
    };
}]);