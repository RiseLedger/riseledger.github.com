app.factory('Repos', ['$http', '$q', 'Constant', function ($http, $q, Constant) {
	var q = $q.defer();
	var repos = localStorage.getItem('com.riseledger.repos');

	if(repos) {
		q.resolve(JSON.parse(repos));
	}
	else {
		$http.get(Constant.repos).then(function (data) {
			localStorage.setItem('com.riseledger.repos', JSON.stringify(data));
			q.resolve(data);
		});
	}

	return {
		repos : q.promise
	};
}]);