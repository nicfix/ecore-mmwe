/**
 * Created by nicolasacco on 15/10/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModels')
		.directive('consolePanel', consolePanelDirective);

	/* @ngInject */
	function consolePanelDirective() {
		var directive = {
			bindToController: true,
			controller: ConsolePanelController,
			controllerAs: 'ctrl',
			templateUrl: '/app/modules/metaModels/consolePanel.html',
			restrict: 'EA',
			scope: {}
		};
		return directive;


	} // fine direttiva

	/* @ngInject */
	function ConsolePanelController($rootScope, ECORE_TREE_SERVICE_EVENTS) {

		var self = this;

		// proprietà
		self.logs = []

		// metodi
		self.init = init;

		init();

		// =============================================

		function init() {

		}

		$rootScope.$on(ECORE_TREE_SERVICE_EVENTS.LOG, function (evt, data) {
			self.logs.push(data);
		});

	} // fine controller

})();

