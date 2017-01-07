/**
 * Created by Nicola Sacco on 06/01/2017.
 */
(function () {
	'use strict';

	angular
		.module('modelsBrowser')
		.controller('ModelsListController', ModelsListController);

	/* @ngInject */
	function ModelsListController($state, MODELS) {


		var self = this;

		self.newModel = __newModel;

		/**
		 * Redirects to the metaModelsEditor
		 * with no metaModel id
		 * @private
		 */
		function __newModel() {
			$state.go(MODELS.ROUTES.metaModelSelector)
		}
	}

})();

