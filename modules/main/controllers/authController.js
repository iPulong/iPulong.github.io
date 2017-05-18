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


(function(){
    
    angular
    .module('app')
    .controller('notifController', notifController);

    function notifController($scope, $rootScope, $mdDialog, reportsService, $timeout, NgMap) {
        $scope.reports = reportsService;
        
        $scope.$watch('reports.length', 
            function(newValue, oldValue){
                $scope.newNotif = true;
            }
        );
        
        $scope.viewDetails = function(data, report){
            $mdDialog.show({
                scope:$scope,
                preserveScope:true,
              controller: dialogController,
              templateUrl: 'modules/safetyMap/views/viewReport.html',
              parent: angular.element(document.querySelector('#main-container')),
              clickOutsideToClose:true
            });
             
            function dialogController($scope){
                $scope.report = report;
            }

            NgMap.getMap("gmap").then(function (map) {
                google.maps.event.trigger(map, "resize");

                
                    $timeout(function(){

                        var pos = {
                          lat: report.coords.latitude,
                          lng: report.coords.longitude
                        };
                        
                        //$rootScope.myPosition.coords.latitude = report.coords.latitude;
                        //$rootScope.myPosition.coords.longitude = report.coords.longitude;
                        $rootScope.zoom = 18;
                        
                        map.setCenter(pos);
                        map.setZoom(16);
                        //$rootScope.myPosition.coords.latitude = report.coords.latitude;
                        //$rootScope.myPosition.coords.longitude = report.coords.longitude;
                        google.maps.event.trigger(map, "resize");
                    });
    

            });
            
            
        }
    }
})();