'use strict';
var app = angular.module('ImRaisingManager', [])
	.config(['$routeProvider', function($routeProvider) {
		// Assign route URL and controller
		function newRouteObject(page) {
			return { 
				templateUrl: page.serverPath,  
				controller: function($scope, $rootScope, $routeParams) {
					$scope.pathParam = $routeParams.pathParam;
					$rootScope.currentPage = page.title;
				}
			};
		}
		
		// Add menu routes
		for(var i=0; i<locale.pages.length; i++){
			var page = locale.pages[i];
			$routeProvider.when(page.path, newRouteObject(page));
			// Add submenu routes
			if(page.children){
				for(var j= 0; j<page.children.length; j++){
					var child = page.children[j];
					$routeProvider.when(child.path, newRouteObject(child));
					$routeProvider.when(child.path+"/:pathParam", newRouteObject(child));
				}
			}
			$routeProvider.when(page.path+"/:pathParam", newRouteObject(page));
		}
		// Default route if undefined
		$routeProvider.otherwise({redirectTo: locale.pages[0].path});
	}]);

// Kickstart the application, only instances and constants can be injected to prevent runtime system configuration
app.run(function($rootScope) {
	$rootScope.locale = locale;
	$rootScope.currentPage = locale.pages[0];
});

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
			
		};
	}	
	
	return {
		addRecord: function(name) { crossfilters[name] = createRecord(); return corssFilters[name]; },
	  	removeRecord: function(name) { crossfilters[name].empty(); delete crossfilters[name]; },
	  	getRecord: function(name) { return crossfilters[name]; }
	};
});


app.factory('test', function() {
	var listeners = [];
	var o = {};
	var number = 0;
	o.listenNumber = function(func) {
		listeners.push(func);
		func(number);
	};
	o.getNumber = function() {
		return number;
	};
	o.setNumber = function(n) {
		number = n;
		for(var i=0; i<listeners.length; i++){
			listeners[i](n);
		}
	};
	return o;
});

app.controller('testCtrl', function($scope, test) {
	

});

/*
<jtable src="tableVar" class="ng-isolate-scope ng-scope"></jtable>
var tableVar = {
	headers: [
		{
			column: "First",
			data: "key1",
			hidden: false
		},
		// ...
	],
	rows: [
		{
			key1: "a",
			key2: "b",
			key3: "c",
			key4: "d"
		},
		// ...
	]	
};*/
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
     };
  });
