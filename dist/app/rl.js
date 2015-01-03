"use strict";

var app = angular.module("Rise", []);

var ui = {};

app.value("Base", {
    colors: [ "#00c6ff", "#fff600", "#ff7800", "#5ac71e", "#ff0036", "#002aff", "#f000ff", "#00ff9c", "#acacac", "#e4ff00", "#ff00a2" ],
    exclude: {
        repo: 23490728
    }
});

app.constant("Constant", {
    repos: "https://api.github.com/users/RiseLedger/repos",
    path: {
        img: "/dist/assets/images"
    }
});

app.controller("ReposController", [ "Repos", "$scope", "Base", "Constant", function(Repos, $scope, Base, Constant) {
    $scope.colors = Base.colors;
    Repos.repos.then(function(repos) {
        $scope.repos = repos.data;
    });
} ]);

app.factory("Repos", [ "$http", "$q", "Constant", function($http, $q, Constant) {
    var q = $q.defer();
    var repos = localStorage.getItem("com.riseledger.repos");
    var expireTime = localStorage.getItem("com.riseledger.repos.expire") || 0;
    var isExpired = expireTime < new Date().getTime();
    if (!isExpired) {
        q.resolve(JSON.parse(repos));
    } else {
        $http.get(Constant.repos).then(function(data) {
            localStorage.setItem("com.riseledger.repos", JSON.stringify(data));
            localStorage.setItem("com.riseledger.repos.expire", getExpireDate());
            q.resolve(data);
        });
    }
    function getExpireDate() {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.getTime();
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
                scope.langs = _.compact(_.pluck(repos, "language"));
                scope.displayLang = function(lang) {
                    console.log(lang);
                    console.log(repos);
                };
            });
        }
    };
} ]);

angular.module("Rise").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("dist/views/directives/menu.html", '<ul class="main-menu"><li ng-repeat="lang in langs track by $index"><a ng-click="displayLang(lang)" ng-model="lang" href>{{lang}}</a></li></ul>');
} ]);