(function(){
    
    angular
    .module('app')
    .controller('reportMapController', reportMapController);

    function reportMapController($scope, $rootScope, storageService, $mdDialog) {
        console.log($scope.status);
        
        $scope.report = {};
        $scope.report.images = [];
        $scope.loading = false;
        
        $scope.captureImage = function (ind) {
            var options = {
                quality: 75, 
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG, 
                targetWidth: 300, 
                targetHeight: 300, 
                saveToPhotoAlbum: true
            };
            navigator.camera.getPicture(function(imageURI){
                
                window.resolveLocalFileSystemURL(imageURI, function (fileEntry) {
                  fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                      // This blob object can be saved to firebase
                      var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });                  

                      console.log('IMAGE', blob);

                    };
                    reader.readAsArrayBuffer(file);
                  });
                }, function (error) {
                  console.log(error)
                });
                console.log('IMAGE', dataURItoBlob(imageData));
                $scope.report.images[ind] = imageData;
                
            }, function(error){
                console.error(error);
            }, options);
        }
        
        $scope.save = function(){
            var report = {};
            report.images = [];
            report.areaStatus = ($scope.status?'Unsafe':'Safe');
            report.type = $scope.report.type;
            report.description = $scope.report.description;
            report.coords = {
                latitude: $rootScope.myPosition.coords.latitude,
                longitude: $rootScope.myPosition.coords.longitude,
            };
            report.user = $rootScope.firebaseUser.providerData[0];
            report.datetime = moment().format('YYYY-MM-DD HH:mm');
            
            
            //console.log($scope.report.images[0]);
            var uploadTask = [];
            
            var keepGoing = true;
            
            $scope.loading = true;
            angular.forEach($scope.report.images, function(value, key) {
                //console.log('IMAGE'+key, value);
                
                //console.log('IMAGE'+key, dataURItoBlob(value));
                
                uploadTask[key] = storageService.child('reports/' + value.name + ' ' + JSON.stringify(report.coords) ).put(value);
                
                uploadTask[key].on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, function(error) {
                    console.log(error);
                }, function() {
                    // Upload completed successfully, now we can get the download URL
                    report.images.push(uploadTask[key].snapshot.downloadURL);
                    
                    if(keepGoing && report.images.length == $scope.report.images.length){
                        console.log(report.images);
                        $scope.reports
                        .$add(report).then(function(ref) {
                            var id = ref.key;
                            console.log("added record with id " + id);
                            $mdDialog.hide();
                            $scope.loading = false;
                        }).catch(function(error) {
                            console.log("Error:", error);
                            $scope.loading = false;
                        });               
                        keepGoing = false;
                        
                    }
                });
                
            });
            
            
        }
    }
})();