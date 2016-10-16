/**
 * Created by nicolasacco on 25/09/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModels')
		.controller('MetaModelsListController', MetaModelsListController);

	/* @ngInject */
	function MetaModelsListController() {

		var self = this;

		// =======================================================

		// costanti
		self.CONST = 'MY_CONST'

		// proprietà
		self.prop = 'myProp';

		// metodi
		self.init = init;


		init();

		// =======================================================

		function init() {

		}

	} // fine controller

})();

