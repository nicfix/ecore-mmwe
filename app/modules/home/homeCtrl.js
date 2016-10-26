(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:HomeCtrl
	 * @description
	 * # HomeCtrl
	 * Controller of the app
	 */

	angular
		.module('mmwe')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService', '$timeout'];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function Home(homeService, $timeout) {
		/*jshint validthis: true */
		var vm = this;


		vm.original_title = "Welcome to MMWE";

		vm.title = '';
		var index = 0;


		vm.subtitle = "DISIM's Meta Model Web Editor";
		vm.version = "1.0.0";

		__typeTitle(index, 500);

		vm.listFeatures = homeService.getFeaturesList();

		function __typeTitle(index, delay_constant) {
			vm.title = vm.title.replace('|', '')
			if (index < vm.original_title.length) {
				vm.title += vm.original_title.charAt(index) + '|';

				$timeout(function () {
					__typeTitle(index + 1, delay_constant)
				}, delay_constant * Math.random())
			}

		}

	}


})();
