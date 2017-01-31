(function(){
    
    angular
    .module('app')
    .controller('viewReportController', viewReportController);

    function viewReportController($scope, reportsService) {
        $scope.imageView = $scope.report.images[0];
        
        $scope.changeImg = function(img){
            $scope.imageView = img;
        }
        
        $scope.valid = function(report){
            report.valid = moment().format('YYYY-MM-DD HH:mm');
            reportsService
            .$save(report)
        }
        
        $scope.delete = function(report){
            report.valid = moment().format('YYYY-MM-DD HH:mm');
            reportsService
            .$remove(report)
        }
        
        $scope.sendTeam = function(report){
            report.teamSent = moment().format('YYYY-MM-DD HH:mm');
            reportsService
            .$save(report)
        }
        
        $scope.teamOnSite = function(report){
            report.onsite = moment().format('YYYY-MM-DD HH:mm');
            reportsService
            .$save(report)
        }
        
        $scope.rescued = function(report){
            report.rescued = moment().format('YYYY-MM-DD HH:mm');
            reportsService
            .$save(report)
        }
    }
})();