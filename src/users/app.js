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
        '$rootScope', '$mdMedia', '$scope', 'userService', '$mdSidenav',  '$location', '$mdBottomSheet', '$log', '$q', '$mdToast', 'dataService',
        function($rootScope, $mdMedia, $scope, userService, $mdSidenav, $location, $mdBottomSheet, $log, $q, $mdToast, dataService){

            var self = this;
            self.photons = dataService.getPhotons();
            self.cores = dataService.getCores();

            //self.selected     = null;
            //self.users        = [ ];
            //self.selectUser   = selectUser;
            self.toggleList   = toggleDeviceList;
            //self.showContactOptions  = showContactOptions;
            self.toggleMenu = toggleMenu;

            //get devices
            // If login is successful we get and accessToken,
            // we'll use it to retrieve attrs for all cores
            /*
            var devicesPr = spark.getAttributesForAll();

            devicesPr.then(
                // We get an array with devices back and we list them
                function(devices){
                    console.log('API call List Devices: ', devices);
                },
                function(err) {
                    console.log('API call failed: ', err);
                }
            );
*/

            function toggleDeviceList() {
                $rootScope.deviceMenuLocked = !$rootScope.deviceMenuLocked;
                console.log($rootScope.deviceMenuLocked);
            }
            
            //function toggleMenuLock

            function toggleMenu(menu) {
                $mdSidenav(menu).toggle();

                //$rootScope.menuLocked = !$rootScope.menuLocked;
            }
        }
    ])


    .controller('deviceCtrl', [
        '$rootScope', '$scope', 'userService', '$mdSidenav', '$location', '$mdBottomSheet', '$log', '$q', '$mdToast', 'dataService',
        function($rootScope, $scope, userService, $mdSidenav, $location, $mdBottomSheet, $log, $q, $mdToast, dataService){

            var self = this;

            spark.on('login', function(err, body) {
                //console.log('API call completed on Login event:', body);
                $mdToast.showSimple('Logged in succesfully');
                $rootScope.currentUser = body.access_token;
                $rootScope.loggedIn = true;
                $state.go('devices');
                //console.log($rootScope.currentUser);
            });
        }
    ])

    .controller('loginCtrl', [
        '$rootScope', '$scope', '$state', 'userService', '$mdSidenav', '$location', '$mdBottomSheet', '$log', '$q', '$mdToast', 'dataService',
        function($rootScope, $scope, $state, userService, $mdSidenav, $location, $mdBottomSheet, $log, $q, $mdToast, dataService){

            var self = this;

            self.loginButton = function(user){
                console.log(user);

                if (typeof user === 'undefined'){
                    $mdToast.showSimple('Please enter valid credentials before proceeding.');
                }
                else {
                   spark.login({username: user.mail, password: user.pass});
                }
            };

            spark.on('login', function(err, body) {
                //console.log('API call completed on Login event:', body);
                $mdToast.showSimple('Logged in succesfully');
                $rootScope.currentUser = body.access_token;
                $rootScope.loggedIn = true;
                $state.go('devices');
                //console.log($rootScope.currentUser);
            });

        }
    ])


    .run(['$rootScope', '$mdMedia', '$state', '$stateParams', '$location', '$mdToast',
        function ($rootScope, $mdMedia, $state, $stateParams, $mdToast, $location) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.deviceMenuLocked = true;
            $rootScope.$mdMedia = $mdMedia;

            $rootScope.$on('$stateChangeStart', function (event, toState, $mdToast, toParams) {
                var requireLogin = toState.data.requireLogin;

                if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                    event.preventDefault();

                    //console.log('I need credentials, please!')
                    $state.go('login');
                    // get me a login modal!
                }
            });
        }
    ]);



