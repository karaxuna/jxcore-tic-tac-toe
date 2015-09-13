var app = angular
	.module(module.name, [
        'ui.router',
        'ngResource',
        'ngSanitize',
        'ngAnimate'
    ].concat(module.dependencies))
	.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
		function(stateProvider, urlRouterProvider, locationProvider){
			stateProvider.state(module.name, {
				url: '',
				template: '<div ui-view class="lang-ka"></div>',
				abstract: true
			});
			locationProvider.html5Mode(false).hashPrefix('!');
		}
	])
	.run(['$rootScope', '$state', '$location', 'enums',
        function (rootScope, state, location, enums) {
            rootScope.enums = enums;

            [
                'start',
                'filled'
            ].forEach(function (name) {
                jxcore(name).register(function (data) {
                    rootScope.$broadcast('server:' + name, data);
                });
            });
        }
    ]);

// start angular after jxcore is ready
(function check() {
    if (typeof jxcore === 'undefined') {
        setTimeout(check, 5);
    } else if (jxcore === 'none' || cordova === 'none') {
        init();
    } else {
        jxcore.isReady(function () {
            jxcore('alert').register(alert);
            jxcore('app.js').loadMainFile(function(result, err) {
                if (err) {
                    alert(err);
                } else {
                    init();
                }
            });
        });
    }
})();

function init() {
    app.value('enums', enums);
    setTimeout(function () {
        try {
            angular.bootstrap(document, [app.name]);
        } catch (err) {
            alert(err);
        }
    });
}