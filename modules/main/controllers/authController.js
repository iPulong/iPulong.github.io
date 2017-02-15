(function(){
    
    angular
    .module('app')
    .controller('authController', authController);

    function authController($scope, $rootScope, $mdToast, authService, $mdMenu) {
        
        
        
        $scope.loginWith = function(provider) {
            
            if(window['facebookConnectPlugin'] != void 0)
            facebookConnectPlugin.login(['public_profile'], function(auth){
                var credential = firebase.auth.FacebookAuthProvider.credential(auth.authResponse.accessToken)
                console.log(credential);
                
                authService.$signInWithCredential(credential).then(function(firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                }).catch(function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(JSON.stringify(error))
                            .position('top right')
                            .hideDelay(5000)
                    );
                });
            }, function(error){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(JSON.stringify(error))
                        .position('top right')
                        .hideDelay(5000)
                );
                
                
            });
            
            /*{
    "status": "connected",
    "authResponse": {
        "session_key": true,
        "accessToken": "<long string>",
        "expiresIn": 5183979,
        "sig": "...",
        "secret": "...",
        "userID": "634565435"
    }
}*/
            
            //window.open = cordova.InAppBrowser ? cordova.InAppBrowser.open : window.open;

            authService.$signInWithRedirect(provider).then(function(result) {
                console.log("firebaseUser:", $rootScope.firebaseUser);
            }).catch(function(error) {
                console.error('$signInWithPopup:', error);

                $mdToast.show(
                    $mdToast.simple()
                        .textContent(JSON.stringify(error))
                        .position('top right')
                        .hideDelay(5000)
                );

                authService.$signInWithPopup("google").then(function() {
                  // Never called because of page redirect
                }).catch(function(error) {
                    console.error('$signInWithRedirect:', error);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(JSON.stringify(error))
                            .position('top right')
                            .hideDelay(5000)
                    );
                });
            });
        }
        
        $scope.signOut = function() {
            authService.$signOut();
        }
    }
})();