app.directive('menu', ['Repos', 'Base', '$rootScope', function (Repos, Base, $rootScope) {

	return {
		restrict : 'E',
		scope : true,
		templateUrl : 'dist/views/directives/menu.html',
		link : function (scope, element, attrs) {
			Repos.repos.then(function (repos) {
				var repos = repos.data;
				repos = repos.filter(function (item) {
					return Base.exclude.repo !== item.id;
				});

				scope.langs = _.uniq( _.compact( _.pluck(repos, 'language') ) );

				scope.displayLang = function (lang) {
					$rootScope.$broadcast('repos:filter', lang);
				}
			});
		}
	};
}]);
