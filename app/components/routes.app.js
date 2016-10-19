/**
 * Created by devds on 13.09.16.
 */
cjs.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home");

    var homeState = {
        name: 'home',
        url: '/home',
        controller: 'homeController',
        templateUrl: 'app/components/home/html/home.html'
    };

    $stateProvider.state(homeState);

});