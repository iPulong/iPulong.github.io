(function(){
    
    angular
    .module('app')
    .controller('viewReportController', viewReportController);

    function viewReportController($scope, $rootScope, reportsService, $mdDialog) {
        $scope.imageView = $scope.report.images[0];
        
        $scope.changeImg = function(img){
            $scope.imageView = img;
        }
        
        $scope.valid = function(report){
            var datetime = moment().format('YYYY-MM-DD HH:mm:ss');
            var user = JSON.parse(angular.toJson($rootScope.firebaseUser.providerData[0]));report.progress = report.progress || [];
            report.progress.push({
                'action':'VALIDATED', 
                'datetime':datetime, 
                'user':user
            });
            report.valid = datetime;
            reportsService
            .$save(report)
        }
        
        $scope.delete = function(report){
            //report.valid = moment().format('YYYY-MM-DD HH:mm');
            reportsService
            .$remove(report);
            
            $mdDialog.hide();
        }
        
        $scope.sendTeam = function(report){
            var datetime = moment().format('YYYY-MM-DD HH:mm');
            var user = JSON.parse(angular.toJson($rootScope.firebaseUser.providerData[0]));
            report.progress = report.progress || [];
            report.progress.push({
                'action':'Help Team Sent', 
                'datetime':datetime, 
                'user':user
            });
            report.teamSent = datetime;
            reportsService
            .$save(report)
        }
        
        $scope.teamOnSite = function(report){
            var datetime = moment().format('YYYY-MM-DD HH:mm:ss');
            var user = JSON.parse(angular.toJson($rootScope.firebaseUser.providerData[0]));
            report.progress = report.progress || [];
            report.progress.push({
                'action':'Team is onsite', 
                'datetime':datetime, 
                'user':user
            });
            report.onsite = datetime;
            reportsService
            .$save(report)
        }
        
        $scope.rescued = function(report){
            var datetime = moment().format('YYYY-MM-DD HH:mm:ss');
            var user = JSON.parse(angular.toJson($rootScope.firebaseUser.providerData[0]));
            report.progress = report.progress || [];
            report.progress.push({
                'action':'Rescued/Done', 
                'datetime':datetime, 
                'user':user
            });
            report.rescued = datetime;
            reportsService
            .$save(report)
        } 
        
        $scope.sendReport = function(report){
            var datetime = moment().format('YYYY-MM-DD HH:mm:ss');
            var user = JSON.parse(angular.toJson($rootScope.firebaseUser.providerData[0]));
            report.progress = report.progress || [];
            report.progress.push({
                'action':$scope.report.customReport, 
                'datetime':datetime, 
                'user':user
            });
            reportsService
            .$save(report)
            $scope.report.customReport = "";
            
        }
    }
})();