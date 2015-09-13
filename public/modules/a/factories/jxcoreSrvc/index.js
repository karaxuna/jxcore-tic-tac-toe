app.factory(current.name, ['$q', '$rootScope', function(q, rootScope) {
    return {
        call: function (name) {
            var defered = q.defer();
            var args = Array.prototype.slice.call(arguments, 1);
            var jxcoreFunction = jxcore(name);
            
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
