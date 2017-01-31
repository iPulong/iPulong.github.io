(function(){
    
    angular
    .module('app')
    .factory('databaseService', databaseService);

    function databaseService() {
        return firebase.database().ref();
    }
})();