(function(){
    angular
    .module('app')
    .run(run);
    
    function run($window, $timeout, $rootScope, $mdToast, $mdSidenav, $state, authService){
        
        $rootScope.none = function(){}
        $rootScope.$state = $state;
        
        authService.$onAuthStateChanged(function(firebaseUser) {
            $rootScope.firebaseUser = firebaseUser;
            console.log('Firebase', firebaseUser);
        });

        $rootScope.toggleSideNav = function(id) {
            $mdSidenav(id).toggle();
        }
        
       /* navigator.geolocation.watchPosition(function(pos){
            $rootScope.myPosition = pos;
            $timeout(function(){
                $rootScope.myPosition = pos;
            });
        }, function(){}, {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 250
        });*/
        
        $rootScope.online = navigator.online;
        $window.addEventListener("offline", offlineFunc, false);
        $window.addEventListener("online", onlineFunc, false);
        
        function offlineFunc() {
            
            
            $rootScope.$apply(function(){
                $rootScope.online = false;
                
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('No Internet Connection!')
                        .position('top right')
                        .hideDelay(0)
                );
                
                $rootScope.online = false;
            });
        }
        
        function onlineFunc() {
            $rootScope.$apply(function(){
                $rootScope.online = true;
                
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Internet connection is back!')
                        .position('top right')
                        .hideDelay(3000)
                );
                
                $rootScope.online = true;
            });
        }
    }
})();