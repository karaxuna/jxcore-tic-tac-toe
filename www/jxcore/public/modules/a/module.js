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
        }
    ]);

// start angular after jxcore is ready
(function check() {
    if (jxcore === 'none' || cordova === 'none') {
        init(false);
    } else if (typeof jxcore === 'undefined') {
        setTimeout(check, 5);
    } else {
        jxcore.isReady(function () {
            jxcore('app.js').loadMainFile(function(result, err) {
                if (err) {
                    alert(err);
                } else {
                    init(true);
                }
            });
        });
    }
})();

function init(isMobile) {
    setTimeout(function () {
        app.value('isMobile', isMobile);
        app.value('enums', enums);
        angular.bootstrap(document, [app.name]);
    });
}