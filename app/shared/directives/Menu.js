app.directive('menu', ['Repos', 'Base', function (Repos, Base) {

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

				scope.langs = _.pluck(repos, 'language')
			})
		}
	};
}]);