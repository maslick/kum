define(['../module', 'jquery'], function (controllers, $) {
    'use strict';



    controllers.controller('MyCtrl1', ['$scope', '$http', "$window", function ($scope, $http, $window) {
        $scope.iocs = [];
        $scope.newioc = {};
        var restPrefix = 'http://localhost:8080/v1';
        var Snarl = $window.Snarl;
        var timeout = 3000;

        $scope.updateIOCtable = function() {
            $http.get(restPrefix + "/iocs").success(function (data) {
                console.log(data);
                $scope.iocs = data;
            });
        };

        $scope.updateIOCtable();


        $scope.submitIoc = function() {
            if ($scope.addIOCform.$valid) {
                $http.post(restPrefix + '/add', $scope.newioc, []).success(function (data) {
                    console.log("IOC added!");
                    Snarl.addNotification({
                        title: "ADD",
                        text: "New IOC added",
                        icon: '<i class="glyphicon glyphicon-plus"></i>',
                        timeout: timeout
                    });
                    $scope.updateIOCtable();
                    $scope.newioc = {};
                });
            }
            else {
                if (!$scope.addIOCform.name.$valid) {
                    console.log("Wrong name!");
                    Snarl.addNotification({
                        title: "Form validation Error",
                        text: "IOC name not provided!",
                        icon: '<i class="glyphicon glyphicon-thumbs-down"></i>',
                        timeout: timeout
                    });
                }
                if (!$scope.addIOCform.ip.$valid) {
                    console.log("Wrong ip!");
                    Snarl.addNotification({
                        title: "Form validation Error",
                        text: "IP not provided!",
                        icon: '<i class="glyphicon glyphicon-thumbs-down"></i>',
                        timeout: timeout
                    });

                }
            }
        }

        $scope.removeIOC = function (id) {
            $http.delete(restPrefix + '/delete/' + id).success(function (data){
                console.log(id + " was deleted from the database!");
                Snarl.addNotification({
                    title: "DELETE",
                    text: "IOC was deleted from the database.",
                    icon: '<i class="glyphicon glyphicon-remove"></i>',
                    timeout: timeout
                });
                $scope.updateIOCtable();

            });
        }

    }]);
});
