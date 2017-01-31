(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDWLjMRjhNBlCqqpD3CWiorVy_3XxsIxz8",
        authDomain: "ipulong-eeaf3.firebaseapp.com",
        databaseURL: "https://ipulong-eeaf3.firebaseio.com",
        storageBucket: "ipulong-eeaf3.appspot.com",
        messagingSenderId: "847115648310"
      };
      firebase.initializeApp(config);
    
    
    angular
    .module('app')
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider){
        
        $mdThemingProvider
        .theme('default')
        .primaryPalette('red')
        //.accentPalette('light-blue');
        //.warnPalette('red');
        
        $urlRouterProvider.otherwise("/report");
        
        $stateProvider
        .state('safetymap', {
            url: "/safetymap",
            templateUrl: 'modules/safetyMap/views/safetyMap.html',
            controller: 'safetyMapController'
        })
        .state('report', {
            url: "/report",
            templateUrl: 'modules/report/views/report.html',
            //controller: 'certifiedController'
        })
        .state('404', {
            url: "/404",
            templateUrl: 'modules/main/views/underConstruction.html',
            //controller: 'certifiedController'
        })
        /*.state('about', {
            url: "/about",
            templateUrl: 'modules/about/views/about.html',
        })
        .state('contactus', {
            url: "/contactus",
            templateUrl: 'modules/contactus/views/contactUs.html',
            controller: 'certifiedController'
        })
        .state('partners', {
            url: "/partners",
            templateUrl: 'modules/partner/views/partnersList.html',
            controller: 'partnerController'
        })*/
        
    });
    
    
})();