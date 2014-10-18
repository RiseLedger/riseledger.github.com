app.controller('ReposController', ['Repos', '$scope', 'Base', 'Constant', function (Repos, $scope, Base, Constant) {

    $scope.colors       = Base.colors;
    $scope.gridsterOpts = Base.gridsterOpts;
    $scope.items        = Base.items;

	Repos.repos.then(function (repos) {
        $scope.repos = repos.data;

        for(var i = $scope.repos.length; i < $scope.items.length; i++) {
            $scope.repos[i] = {
                empty : true,
                title : 'Coming soon',
                image : Constant.path.img + '/coming-soon.png',
                color : '#000000'
            }
        }
	});

}]);