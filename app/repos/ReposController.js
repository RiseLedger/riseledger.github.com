app.controller('ReposController', ['Repos', '$scope', 'Base', 'Constant', function (Repos, $scope, Base, Constant) {

    $scope.colors       = Base.colors;

	Repos.repos.then(function (repos) {
        $scope.repos = repos.data;
	});

}]);