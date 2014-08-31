app.controller('ReposController', ['Repos', '$scope', function (Repos, $scope) {

	Repos.repos.then(function (repos) {
		$scope.repos = repos.data;
	});

}]);