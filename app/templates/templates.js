angular.module('Rise').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dist/views/directives/menu.html',
    "<ul class=\"main-menu\"><li ng-repeat=\"lang in langs track by $index\"><a href>{{lang}}</a></li></ul>"
  );

}]);
