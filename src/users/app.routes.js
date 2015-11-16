angular.module('routerRoutes', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider){




        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "pages/home.welcome.html",
                controller: "mainController",
                data: {
                    requireLogin: true
                }
            })
            .state('settings', {
                url: "/settings",
                templateUrl: "pages/settings.html",
                controller: "mainController",
                data: {
                    requireLogin: true
                }
            })

            .state('devices', {
                url: "/devices",
                templateUrl: "pages/devices.html",
                controller: "deviceCtrl",
                data: {
                    requireLogin: true
                }
            })

            .state('login', {
                url: "/login",
                templateUrl: "pages/login.html",
                controller: "loginCtrl as lgn",
                data: {
                    requireLogin: false
                }
            });

        //$locationProvider.html5Mode(true).hashPrefix('!');;
    });