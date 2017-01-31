(function(){
    
    angular
    .module('app')
    .factory('reportsService', reportsService);

    function reportsService(databaseService, $firebaseArray) {
        return $firebaseArray(databaseService.child('reports'));
    }
})();