var admin = angular.module('masterAdmin');
admin.directive('masterAdminTopBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/masterAdminTopBar.html',
        controller: 'MasterViewController'
    };
}]);