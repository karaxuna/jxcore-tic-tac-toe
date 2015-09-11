app.factory(current.name, ['$q', function(q) {
    return {
        callAsyncFunction: function (name, data) {
            var defered = q.defer();
            jxcore(name).call(data, function (result, err) {
                if (err) {
                    defered.reject(err);
                } else {
                    defered.resolve(result);
                }
            });
            return defered.promise;
        }
    };
}]);
