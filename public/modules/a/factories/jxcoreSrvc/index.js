app.factory(current.name, ['$q', function(q) {
    return {
        call: function (name) {
            var defered = q.defer();
            var jxcoreFunction = jxcore(name);
            var args = Array.prototype.slice.call(arguments, 1);

            jxcoreFunction.call.apply(jxcoreFunction, args.concat(function (result, err) {
                if (err) {
                    defered.reject(err);
                } else {
                    defered.resolve(result);
                }
            }));

            return defered.promise;
        }
    };
}]);
