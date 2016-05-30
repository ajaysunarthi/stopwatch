/**
*  Module
*
* Description
*/
(function(){

angular.module('stopWatch', []).
controller('appCtrl', appController);

function appController ($scope) {
	var vm = this;

	vm.title = "stopwatch";
}

appController.$inject = ['$scope'];
	
})();