(function(){
    
    angular
    .module('app')
    .factory('authService', authService);

    function authService($firebaseAuth) {
        return $firebaseAuth();
    }
})();