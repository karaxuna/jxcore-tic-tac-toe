angular.module(module.name)
    .directive(current.name, [function() {
        return {
            restrict: 'E',
            template: '<div class="cd-burger" ng-class="expanded ? \'expanded\' : null" ng-transclude></div>',
            transclude: true,
            replace: true,
            scope: true, 
            controller: ['$scope', '$attrs', function (scope, attrs) {
                this.expanded = function (expanded) {
                    if (typeof expanded !== 'undefined') {
                       scope.expanded = expanded; 
                    } else{
                        return scope.expanded;
                    }
                };
            }]
        }
    }])
    .directive(current.name + 'Menu', [function() {
        return {
            restrict: 'E',
            template: '<div class="cd-burger-menu" ng-transclude></div>',
            transclude: true,
            replace: true
        }
    }])
    .directive(current.name + 'Content', [function() {
        return {
            restrict: 'E',
            template: '<div class="cd-burger-content" ng-transclude></div>',
            transclude: true,
            replace: true
        }
    }])
    .directive(current.name + 'Header', [function() {
        return {
            restrict: 'E',
            templateUrl: current.path + '/header.html',
            transclude: true,
            replace: true,
            require: '^' + current.name,
            scope: true,
            link: function (scope, element, attrs, burgerCtrl) {
                scope.expanded = burgerCtrl.expanded;
                scope.toggle = function () {
                    scope.expanded(!scope.expanded());
                };
            }
        }
    }])
    .directive(current.name + 'Body', [function() {
        return {
            restrict: 'E',
            template: '<div class="cd-burger-body" ng-transclude></div>',
            transclude: true,
            replace: true
        }
    }]);
