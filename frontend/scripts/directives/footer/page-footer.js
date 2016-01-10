define([
    '../module',
    'text!./footer.html'
], function (directives, footer) {
    'use strict';
    directives.directive('pageFooter', function () {
        return  {
            template: footer,
            restrict: 'E'
        };
    });
});
