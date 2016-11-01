(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:LayoutCtrl
	 * @description
	 * # LayoutCtrl
	 * Controller of the app
	 */

	angular
		.module('mmwe')
		.controller('LayoutCtrl', Layout);

	Layout.$inject = ['$mdSidenav', '$scope', '$state'];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function Layout($mdSidenav, $scope, $state) {
		/*jshint validthis: true */
		var vm = this;


		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};


		$scope.$on('$stateChangeSuccess', function () {
			vm.title = $state.current.title;
		})


	}

})();
