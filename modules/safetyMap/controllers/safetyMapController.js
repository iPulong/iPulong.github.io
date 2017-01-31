(function(){
    
    angular
    .module('app')
    .controller('safetyMapController', safetyMapController);

    function safetyMapController($scope, $timeout, $rootScope, NgMap, $mdDialog, reportsService, $timeout) {
        $scope.address = "Philippines";
        
        $scope.zoom = 6;
        $scope.reports = reportsService;
        //console.log('NgMap', NgMap)
        
        /*navigator.geolocation.watchPosition(function(pos){
            console.log('GEOLOCATION', pos);
            $rootScope.myPosition = pos;
            $rootScope.$apply(); 
        }, function(){}, {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 0
        });*/
        
        NgMap.getMap("gmap").then(function (map) {
            google.maps.event.trigger(map, "resize");
            $scope.zoom = 14;
            $scope.map = map;
            
            navigator.geolocation.getCurrentPosition(function(position) {
                $timeout(function(){
                    console.log(position);
                    var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
                    map.setCenter(pos);
                    $rootScope.myPosition = position;
                    google.maps.event.trigger(map, "resize");
                });
            }, function() {
                NgMap.getGeoLocation($scope.address)
                .then(function (latlng) {
                    map.setCenter(latlng);
                    $scope.zoom = 6;
                });
                google.maps.event.trigger(map, "resize");
            });
            
            google.maps.event.trigger(map, "resize");
            $timeout(function(){
                google.maps.event.trigger(map, "resize");
            });

        });
        
        $scope.zoomIn = function(){
            $scope.zoom++;
        }
        
        $scope.zoomOut = function(){
            $scope.zoom--;
        }
        
        $scope.report = function(status) {
            $mdDialog.show({
              controller: dialogController,
              templateUrl: 'modules/safetyMap/views/reportMap.html',
              parent: angular.element(document.querySelector('#main-container')),
              clickOutsideToClose:true
            });
            
            function dialogController($scope){
                $scope.status = status;
                $scope.reports = reportsService;
            }
        }
        
        $scope.viewDetails = function(data, report){
            $mdDialog.show({
              controller: dialogController,
              templateUrl: 'modules/safetyMap/views/viewReport.html',
              parent: angular.element(document.querySelector('#main-container')),
              clickOutsideToClose:true
            });
            
            function dialogController($scope){
                $scope.report = report;
            }
        }
    }
})();