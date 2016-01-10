/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
    'require',
    'angular',
    'jquery',
    'rainbow',
    'snarl',
    'twitter-bootstrap',
    'app',
    'routes',
], function (require, ng, $, rainbow) {
    'use strict';

    /*
     * place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */
    rainbow.show();

    var sleeping = function() {
        $('#splash').fadeOut(300, function() {
            $(this).remove();
        });
        rainbow.hide();
    };

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);

        setTimeout(sleeping, 400);
        $('.dropdown-toggle').dropdown();

    });
});