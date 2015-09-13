app.factory(current.name, ['$q', '$rootScope', function(q, rootScope) {
    var listeners = {};

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
        },

        on: function (name, fn) {
            if (listeners[name]) {
                listeners[name].push(fn);
            } else {
                listeners[name] = fn;
                jxcore(name).register(function () {
                    var args = arguments;
                    listeners[name].forEach(function (lnr) {
                        lnr.apply(args);
                    });
                    rootScope.$digest();
                });
            }
        }
    };
}]);
