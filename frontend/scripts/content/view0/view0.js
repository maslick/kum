define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('MyCtrl0', ['$scope',function ($scope) {
        $scope.hi = "Do you like it?";
    }]);
});
