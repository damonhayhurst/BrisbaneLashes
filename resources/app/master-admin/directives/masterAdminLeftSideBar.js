var admin = angular.module('masterAdmin');
admin.directive('masterAdminLeftSideBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/masterAdminLeftSideBar.html',
        controller: 'MasterViewController'
    };
}]);