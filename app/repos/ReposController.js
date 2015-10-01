app.controller('ReposController', ['Repos', '$scope', 'Base', 'Constant', function (Repos, $scope, Base, Constant) {

    var reposCollection;
    $scope.colors = Base.colors;

	Repos.repos.then(function (repos) {
        reposCollection = repos;
        $scope.repos = repos;
	});

    $scope.$on('repos:filter', function (evt, lang) {
        $scope.repos = _.filter(reposCollection, function (repo) {
            if(lang) return repo.language === lang;
            else return repo;
        });
    });

}]);
