//Service for Studio CRUD methods 
angular.module('brisbaneLashes').factory('Studio', function($http) {
    return {
        get: function(id) {
            return $http.get('/api/studio/' + id);
        },
            
        save: function(studio) {
            return $http.post('/api/studio', studio, {headers: {
                'Content-Type': 'application/json; charset=utf-8'
                }});
        },
            
        update: function(studio) {
            return $http.put('/api/studio/' + studio.id);
        },
            
        destroy: function(id) {
            return $http.delete('/api/studio/' + id);
        }
    }
});