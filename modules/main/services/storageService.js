(function(){
    
    angular
    .module('app')
    .factory('storageService', storageService);

    function storageService() {
        return firebase.storage().ref();
    }
})();