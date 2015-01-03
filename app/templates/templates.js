angular.module('Rise').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dist/views/directives/menu.html',
    "<ul class=\"main-menu\"><li><a ng-click=\"displayLang('')\" href>All</a></li><li ng-repeat=\"lang in langs track by $index\"><a ng-click=\"displayLang(lang)\" ng-model=\"lang\" href>{{lang}}</a></li></ul>"
  );

}]);
