/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function(app) {
    'use strict';
    return app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $stateProvider
            .state('index',{
                url: '/asd',
                templateUrl: 'scripts/content/view0/view0.html',
                controller: 'MyCtrl0'
            })
            .state('view1',{
                url: '/',
                templateUrl: 'scripts/content/view1/view1.html',
                controller:'MyCtrl1'
            })
            .state('view2',{
                url: '/view2',
                templateUrl: 'scripts/content/view2/view2.html',
                controller: 'MyCtrl2'
            });

        $urlRouterProvider.otherwise('/');

        var html5 = {
            enabled: false,
            requireBase: true,
            rewriteLinks: true
        };

        $locationProvider.html5Mode(html5).hashPrefix('');

        $httpProvider.defaults.headers.common.Accept = 'application/json, text/plain';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        $httpProvider.defaults.timeout = 15000;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    });
});