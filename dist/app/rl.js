"use strict";

var app = angular.module("Rise", []);

var ui = {};

app.value("Base", {
    colors: [ "#00C6FF", "#9C58C4", "#FF8124", "#1FC63E", "#DF2929", "#303FCA", "#f000ff", "#00ff9c", "#acacac", "#e4ff00", "#ff00a2" ],
    exclude: {
        repo: ""
    }
});

app.constant("Constant", {
    repos: "https://api.github.com/users/RiseLedger/repos",
    path: {
        img: "/dist/assets/images"
    }
});

app.controller("ReposController", [ "Repos", "$scope", "Base", "Constant", function(Repos, $scope, Base, Constant) {
    var reposCollection;
    $scope.colors = Base.colors;
    Repos.repos.then(function(repos) {
        reposCollection = repos;
        $scope.repos = repos;
    });
    $scope.$on("repos:filter", function(evt, lang) {
        $scope.repos = _.filter(reposCollection, function(repo) {
            if (lang) return repo.language === lang; else return repo;
        });
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
            var ownerRepos = filterByOwner(data.data);
            localStorage.setItem("com.riseledger.repos", JSON.stringify(ownerRepos));
            localStorage.setItem("com.riseledger.repos.expire", getExpireDate());
            q.resolve(ownerRepos);
        });
    }
    function getExpireDate() {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.getTime();
    }
    function filterByOwner(repos) {
        return repos.filter(function(repo) {
            return !repo.fork;
        });
    }
    return {
        repos: q.promise
    };
} ]);

app.directive("menu", [ "Repos", "Base", "$rootScope", function(Repos, Base, $rootScope) {
    return {
        restrict: "E",
        scope: true,
        templateUrl: "dist/views/directives/menu.html",
        link: function(scope, element, attrs) {
            Repos.repos.then(function(repos) {
                repos = repos.filter(function(item) {
                    return Base.exclude.repo !== item.id;
                });
                scope.langs = _.uniq(_.compact(_.pluck(repos, "language")));
                scope.displayLang = function(lang) {
                    $rootScope.$broadcast("repos:filter", lang);
                };
            });
        }
    };
} ]);

angular.module("Rise").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("dist/views/directives/menu.html", '<ul class="main-menu"><li><a ng-click="displayLang(\'\')" href>All</a></li><li ng-repeat="lang in langs track by $index"><a ng-click="displayLang(lang)" ng-model="lang" href>{{lang}}</a></li></ul>');
} ]);