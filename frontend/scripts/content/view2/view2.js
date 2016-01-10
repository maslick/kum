define(['../module', 'jquery'], function (controllers, $) {
    'use strict';
    controllers.controller('MyCtrl2', ['$scope', '$http', function ($scope, $http) {

        /*$("#menu-toggle").click( function (e){
            e.preventDefault();
            $("#wrapper").toggleClass("menuDisplayed");
        });*/

        //var url = "https://restapip1941753077trial.hanatrial.ondemand.com/restapi/v1/ping?name=maslick";
        $scope.get = function (who){
            if (!who) return;
            var url = "http://localhost:8080/restapi/v1/ping?name=" + who;

            $http.get(url).success(function (data) {
                $scope.text = data;
            });
        }

        /*$scope.$watch('name', function(newVal, oldVal){
            $scope.get(newVal);
        }, true);*/


    }]);
});
