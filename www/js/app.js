var app = angular.module('sigap', [
    'ngRoute',
    'ngMaterial',
    'ngSanitize'
]);

app.config(function($routeProvider, $sceProvider) {
    $sceProvider.enabled(false);
    $routeProvider.when("/", {
            templateUrl: "views/layout.html",
            controller: 'LayoutController'
        })
        //pagina inicial
        .otherwise({
            templateUrl: "views/layout.html",
            controller: 'LayoutController'
        });
});