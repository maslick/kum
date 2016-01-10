define(['../module', 'jquery'], function (controllers, $) {
    'use strict';
    controllers.controller('MyCtrl1', ['$scope', '$http', function ($scope, $http) {
        $scope.iocs = [];
        $scope.newioc = {};
        var restPrefix = 'http://localhost:8080/v1';

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
                    $scope.updateIOCtable();
                    //thisclass.notify("ADD", "New IOC added", "glyphicon glyphicon-plus");
                    //thisclass.updateIOCtable();
                    $scope.newioc = {};
                });
            }
            else {
                if (!$scope.addIOCform.name.$valid) {
                    console.log("Wrong name!");
                    //this.notify("Validation Error", "IOC name not provided!", "glyphicon glyphicon-thumbs-down");
                }
                if (!$scope.addIOCform.ip.$valid) {
                    console.log("Wrong ip!");
                    //this.notify("Validation Error", "IP not provided!", "glyphicon glyphicon-thumbs-down");
                }
            }
        }

        $scope.removeIOC = function (id) {
            $http.delete(restPrefix + '/delete/' + id).success(function (data){
                console.log(id + " was deleted from database!");
                //thisclass.notify("DELETE", "IOC #" + id + " was deleted from database.", "glyphicon glyphicon-remove");
                $scope.updateIOCtable();
            });
        }

    }]);
});
