app.factory('Repos', ['$http', '$q', 'Constant', function ($http, $q, Constant) {
	var q          = $q.defer();
	var repos      = localStorage.getItem('com.riseledger.repos');
	var expireTime = localStorage.getItem('com.riseledger.repos.expire') || 0;
	var isExpired  = expireTime < new Date().getTime();

	if(!isExpired) {
		q.resolve(JSON.parse(repos));
	}
	else {
		$http.get(Constant.repos).then(function (data) {
			localStorage.setItem('com.riseledger.repos', JSON.stringify(data));
			localStorage.setItem('com.riseledger.repos.expire', getExpireDate());
			q.resolve(data);
		});
	}

	function getExpireDate() {
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow.getTime();
	}

	return {
		repos : q.promise
	};
}]);