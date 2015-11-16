angular.module('myApp', ['ngMaterial', 'users', 'ui.router', 'routerRoutes', 'ngAnimate'])

    .config(function($mdThemingProvider, $mdIconProvider){

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("backburger" , "./assets/svg/backburger.svg"  , 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');
    })

    .factory('Auth', function(){
        var user;

        return{
            setUser : function(aUser){
                user = aUser;
            },
            isLoggedIn : function(){
                return(user)? user : false;
            }
        }
    })

    .service('dataService', function () {

        var photons = [];
        var cores = [];

        return {
            getPhotons:function () {
                // This exposed private data
                return photons;
            },
            getCores:function () {
                return cores;
            },
            addPhotons:function (device) {
                photons.push(device);
                //console.log(device);
            },
            addCore:function (device) {
                cores.push(device);
                //console.log(device);
            }
        };
    })



    .controller('mainController', [
        '$scope', 'userService', '$mdSidenav', 'Auth', '$location', '$mdBottomSheet', '$log', '$q', '$mdToast', 'dataService',
        function($scope, userService, $mdSidenav, Auth, $location, $mdBottomSheet, $log, $q, $mdToast, dataService){

            var self = this;
            self.photons = dataService.getPhotons();
            self.cores = dataService.getCores();

            //self.selected     = null;
            //self.users        = [ ];
            //self.selectUser   = selectUser;
            self.toggleList   = toggleDeviceList;
            //self.showContactOptions  = showContactOptions;
            self.toggleMenu = toggleMenu;


            /**
             * First hide the bottomsheet IF visible, then
             * hide or Show the 'left' sideNav area
             */
            function toggleDeviceList() {
                var pending = $mdBottomSheet.hide() || $q.when(true);

                pending.then(function(){
                    $mdSidenav('deviceMenu').toggle();
                });
            }

            function toggleMenu(menu) {
                $mdSidenav(menu).toggle();
            }

        }
    ])


    .controller('loginCtrl', [
        '$scope', 'userService', '$mdSidenav', 'Auth', '$location', '$mdBottomSheet', '$log', '$q', '$mdToast', 'dataService',
        function($scope, userService, $mdSidenav, Auth, $location, $mdBottomSheet, $log, $q, $mdToast, dataService){

            console.log("hello motherfuckers!");

            var self = this;
            self.loginButton = loginUser;

            function loginUser(){
                console.log("bullshit");
            }

            self.loginButton = function(user){
                console.log('motherfucker');
            };

            self.penis = function(){
                console.log("lol");
            };
            console.log("hey homies");
        }
    ])


    .run(['$rootScope', '$state', '$stateParams', 'Auth', '$location',
        function ($rootScope, $state, $stateParams, Auth, $location) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                var requireLogin = toState.data.requireLogin;

                if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                    event.preventDefault();

                    console.log('I need credentials, please!')
                    $state.go('login');
                    // get me a login modal!
                }
            });
        }
    ]);



