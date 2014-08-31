"use strict";

var app = angular.module("Rise", [ "gridster" ]);

var ui = {};

app.value("Base", {
    colors: [ "#00c6ff", "#fff600", "#ff7800", "#5ac71e", "#ff0036", "#002aff", "#f000ff", "#00ff9c" ],
    exclude: {
        repo: 23490728
    }
});

app.constant("Constant", {
    repos: "https://api.github.com/users/RiseLedger/repos"
});

app.controller("ReposController", [ "Repos", "$scope", "Base", function(Repos, $scope, Base) {
    $scope.colors = Base.colors;
    Repos.repos.then(function(repos) {
        $scope.repos = repos.data;
    });
    $scope.gridsterOpts = {
        columns: 6,
        pushing: true,
        floating: true,
        width: "auto",
        colWidth: "auto",
        rowHeight: "match",
        margins: [ 0, 0 ],
        outerMargin: false,
        isMobile: false,
        mobileBreakPoint: 600,
        mobileModeEnabled: true,
        minColumns: 1,
        minRows: 2,
        maxRows: 100,
        defaultSizeX: 2,
        defaultSizeY: 1,
        resizable: {
            enabled: true,
            handles: "n, e, s, w, ne, se, sw, nw",
            start: function(event, uiWidget, $element) {},
            resize: function(event, uiWidget, $element) {},
            stop: function(event, uiWidget, $element) {}
        },
        draggable: {
            enabled: false,
            start: function(event, uiWidget, $element) {},
            drag: function(event, uiWidget, $element) {},
            stop: function(event, uiWidget, $element) {}
        }
    };
} ]);

app.factory("Repos", [ "$http", "$q", "Constant", function($http, $q, Constant) {
    var q = $q.defer();
    var repos = localStorage.getItem("com.riseledger.repos");
    if (repos) {
        q.resolve(JSON.parse(repos));
    } else {
        $http.get(Constant.repos).then(function(data) {
            localStorage.setItem("com.riseledger.repos", JSON.stringify(data));
            q.resolve(data);
        });
    }
    return {
        repos: q.promise
    };
} ]);

app.directive("menu", [ "Repos", "Base", function(Repos, Base) {
    return {
        restrict: "E",
        scope: true,
        templateUrl: "dist/views/directives/menu.html",
        link: function(scope, element, attrs) {
            Repos.repos.then(function(repos) {
                var repos = repos.data;
                repos = repos.filter(function(item) {
                    return Base.exclude.repo !== item.id;
                });
                scope.langs = _.pluck(repos, "language");
            });
        }
    };
} ]);

angular.module("Rise").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("dist/views/directives/menu.html", '<ul class="main-menu"><li ng-repeat="lang in langs track by $index"><a href>{{lang}}</a></li></ul>');
} ]);