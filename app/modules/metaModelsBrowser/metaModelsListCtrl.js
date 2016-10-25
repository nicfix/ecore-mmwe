/**
 * Created by nicolasacco on 25/09/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModelsBrowser')
		.controller('MetaModelsListController', MetaModelsListController);

	/* @ngInject */
	function MetaModelsListController($state, metaModelsService, META_MODELS) {

		var self = this;

		/**
		 * Properties
		 *
		 */
		self.loading = true;
		self.items = [];

		/**
		 * Public methods, invokable in templates
		 */
		self.init = init;
		self.editMetamodel = __editMetaModel;


		/**
		 * Invoking init at the creation of the controller.
		 */
		init();

		/**
		 * Starts loading for metamodels descriptions
		 */
		function init() {
			metaModelsService.loadMetaModels({}).then(__onMetaModelsLoaded)
		}

		/**
		 * Assigns loaded meta models to items attribute then
		 * stops the loading
		 * @param meta_models
		 * @private
		 */
		function __onMetaModelsLoaded(meta_models) {

			self.items = meta_models;
			self.loading = false;
		}

		/**
		 * Handles the loading error,
		 * doing nothing, for now XD
		 * @param response
		 * @private
		 */
		function __onMetaModelsLoadingError(response) {

		}

		/**
		 * Redirects to the metaModelsEditor
		 * with the metaModel passed as parameter
		 * @param mm
		 * @private
		 */
		function __editMetaModel(mm) {

			$state.go(META_MODELS.ROUTES.metaModelsEditor, {modelId: mm.id})
		}

	} // fine controller

})();

