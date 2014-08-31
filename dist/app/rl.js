"use strict";

var app = angular.module("Rise", []);

var ui = {};

app.value("Base", {
    colors: [ "#00c6ff", "#fff600", "#ff7800", "#5ac71e", "#ff0036", "#002aff", "#f000ff", "#00ff9c" ]
});

app.factory("Repos", [ function() {} ]);

app.directive("menu", [ function() {
    return {
        restrict: "E",
        scope: true,
        templateUrl: "dist/views/directives/menu.html",
        link: function(scope, element, attrs) {}
    };
} ]);

angular.module("Rise").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("dist/views/directives/menu.html", "sdd");
} ]);