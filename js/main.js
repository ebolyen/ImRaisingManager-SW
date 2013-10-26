var app = angular.module('ImRaisingManager', [])
	.config(['$routeProvider', function($routeProvider) {
		function newRouteObject(page) {
			return { 
				templateUrl: page.serverPath,  
				controller: function($scope, $rootScope, $routeParams) {
					$scope.pathParam = $routeParams.pathParam; 
					$rootScope.currentPage = page.title
				}
			}
		}
		
		for(var i=0; i<locale.pages.length; i++){
			var page = locale.pages[i]
			$routeProvider.when(page.path, newRouteObject(page))
			if(page.children){
				for(var j= 0; j<page.children.length; j++){
					var child = page.children[j];
					$routeProvider.when(child.path, newRouteObject(child))
					$routeProvider.when(child.path+"/:pathParam", newRouteObject(child))
				}
			}
			$routeProvider.when(page.path+"/:pathParam", newRouteObject(page))
			
		}
		$routeProvider.otherwise({redirectTo: locale.pages[0].path});
	}]);

app.run(function($rootScope) {
	$rootScope.locale = locale;
	$rootScope.currentPage = locale.pages[0];

})

app.factory('crossfilterService', function() {
	
	crossfilters = {};
	
	function createRecord() {
		var cf = crossfilter([]);
		var dimensions = {};
		
		return {
			add: function(data){ cf.add(data); },
			empty: function(data){ cf.remove(); },
			addDimension: function(name, func) { dimensions[name] = cf.dimension(fun); dimensions[name].groups = {}; },
			removeDimension: function(name) { dimensions[name].dispose(); delete dimensions[name]; },
			filterDimension: function(name, f) { dimensions[name].filter(f); },
			resetDimension: function(name) { dimensions[name].filterAll(); },
			getDimensionData: function(name) { dimensions[name].top(Infinity); },
			
		}
	}
	
	
	return {
		addRecord: function(name) { crossfilters[name] = createRecord(); return corssFilters[name]; },
	  	removeRecord: function(name) { crossfilters[name].empty(); delete crossfilters[name]; },
	  	getRecord: function(name) { return crossfilters[name]; }
	}
});


app.factory('test', function() {
	var listeners = [];
	var o = {};
	var number = 0;
	o.listenNumber = function(func) {
		listeners.push(func);
		func(number);
	}
	o.getNumber = function() {
		return number;
	}
	o.setNumber = function(n) {
		number = n;
		for(var i=0; i<listeners.length; i++){
			listeners[i](n);
		}
	}
	return o;
});

app.controller('testCtrl', function($scope, test) {
	

});


app.directive('jtable', function () {
    return {
      restrict: 'E',
      scope: {
      	src: "="
      },
      template: '<table>' +
      	'<tr><th data-ng-repeat="header in src.headers | filter:{hidden:false}">{{header.column}}</th></tr>' +
      	'<tr data-ng-repeat="row in src.rows"><td data-ng-repeat="header in src.headers | filter:{hidden:false}">{{row[header.data]}}</td></tr>' +
      	'</table>'
      }
  });
