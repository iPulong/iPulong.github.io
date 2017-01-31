(function(){
    
    angular
    .module('app')
    .controller('reportController', reportController);

    function reportController($scope, $interval, $mdToast, localStorageService, $rootScope, $mdDialog) {
        navigator.geolocation.watchPosition(function(pos){
            console.log('GEOLOCATION', pos);
            $rootScope.myPosition = pos;
            $rootScope.$apply(); 
        }, function(){}, {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 0
        });
        
        localStorageService.bind($rootScope, 'emergencyContacts');
        
        $rootScope.setContacts = function(){
            
            $rootScope.emergencyContacts = $rootScope.emergencyContacts || [];
            
            
            var options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;

            fields = ["displayName"];
            navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

            function contactfindSuccess(contacts) {
                $scope.deviceContacts = contacts;
                
                $mdDialog.show({
                    templateUrl: 'modules/report/views/contacts.html',
                    parent: angular.element(document.querySelector('#main-container')),
                    clickOutsideToClose:true,
                    scope:$scope,
                    preserveScope:true,
                });

            }

            function contactfindError(message) {
                alert('Failed because: ' + message);
            }
            
        }

        $scope.addToEmergencyContacts = function(chip){
            $rootScope.emergencyContacts.push(chip)
        }

        $scope.addToDeviceContacts = function(chip){
            $scope.deviceContacts.push(chip)
        }
        
        $scope.stop = function(){
            $interval.cancel($rootScope.interval);
            $mdToast.show( 
                $mdToast.simple()
                    .textContent('SMS was stopped')
                    .position('top right')
                    .hideDelay(3000)
            );
            $rootScope.interval = null;
        }
        
        $scope.alert = function(){
            navigator.geolocation.getCurrentPosition(function(position) {
                
                $rootScope.interval = $interval(function(){
                    angular.forEach($rootScope.emergencyContacts, function(value, key) {
                        var options = {
                            replaceLineBreaks: false, // true to replace \n by a new line, false by default
                            android: {
                                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                                intent: '' // send SMS without open any other app
                            }
                        };
                        var number = value.phoneNumbers[0].value;
                        var message = 'ALERT: Help! i am in danger! \nfollow me: http://maps.google.com/maps?q='+position.coords.latitude+','+position.coords.longitude;
                        sms.send(number, message, options, function(){
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('ALERTED: '+ number +' ('+ position.coords.latitude+','+position.coords.longitude+')')
                                    .position('top right')
                                    .hideDelay(3000)
                            );
                        }, function(error){
                            $mdToast.show( 
                                $mdToast.simple()
                                    .textContent(JSON.stringify(error))
                                    .position('top right')
                                    .hideDelay(3000)
                            );
                        }); 

                    });
                }, 15000); // 15secs
                $rootScope.interval.sms = 'Alerting! 15secs Interval';
            }, function(error) {
                $mdToast.show( 
                    $mdToast.simple()
                        .textContent(JSON.stringify(error))
                        .position('top right')
                        .hideDelay(3000)
                );
            });
            
        }
        
        $scope.watch = function(){
            navigator.geolocation.getCurrentPosition(function(position) {
                
                $rootScope.interval = $interval(function(){
                    angular.forEach($rootScope.emergencyContacts, function(value, key) {
                        var options = {
                            replaceLineBreaks: false, // true to replace \n by a new line, false by default
                            android: {
                                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                                intent: '' // send SMS without open any other app
                            }
                        };
                        var number = value.phoneNumbers[0].value;
                        var message = 'WATCH: I feel i\'m in danger. \n please watch me: http://maps.google.com/maps?q='+position.coords.latitude+','+position.coords.longitude;
                        sms.send(number, message, options, function(){
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Watching: '+ number +' ('+ position.coords.latitude+','+position.coords.longitude+')')
                                    .position('top right')
                                    .hideDelay(3000)
                            );
                        }, function(error){
                            $mdToast.show( 
                                $mdToast.simple()
                                    .textContent(JSON.stringify(error))
                                    .position('top right')
                                    .hideDelay(3000)
                            );
                        }); 

                    });
                }, 60000); // 1min
                $rootScope.interval.sms = 'Watching, 1min Interval';
            }, function(error) {
                $mdToast.show( 
                    $mdToast.simple()
                        .textContent(JSON.stringify(error))
                        .position('top right')
                        .hideDelay(3000)
                );
            });
            
        }
        
        $scope.warn = function(){
            navigator.geolocation.getCurrentPosition(function(position) {
                
                $rootScope.interval = $interval(function(){
                    angular.forEach($rootScope.emergencyContacts, function(value, key) {
                        var options = {
                            replaceLineBreaks: false, // true to replace \n by a new line, false by default
                            android: {
                                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                                intent: '' // send SMS without open any other app
                            }
                        };
                        var number = value.phoneNumbers[0].value;
                        var message = 'WARNING: I feel i\'m in danger. \n please watch me: http://maps.google.com/maps?q='+position.coords.latitude+','+position.coords.longitude;
                        sms.send(number, message, options, function(){
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Watching: '+ number +' ('+ position.coords.latitude+','+position.coords.longitude+')')
                                    .position('top right')
                                    .hideDelay(3000)
                            );
                        }, function(error){
                            $mdToast.show( 
                                $mdToast.simple()
                                    .textContent(JSON.stringify(error))
                                    .position('top right')
                                    .hideDelay(3000)
                            );
                        }); 

                    });
                }, 300000); // 5mins
                $rootScope.interval.sms = 'Warning! 5mins Interval';
            }, function(error) {
                $mdToast.show( 
                    $mdToast.simple()
                        .textContent(JSON.stringify(error))
                        .position('top right')
                        .hideDelay(3000)
                );
            });
            
        }
        
        
    }
})();