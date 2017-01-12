/**
 * Created by Nicola Sacco on 06/01/2017.
 */
(function () {
	'use strict';

	angular
		.module('modelsEditor')
		.controller('ModelsEditorController', ModelsEditorController);


	/* @ngInject */
	function ModelsEditorController($stateParams,
									$state,
									modelsService,
									metaModelsService,
									$mdToast,
									MODELS,
									EcoreDecoratorsRepoService,
									ECORE_DECORATOR) {
		var self = this;

		/**
		 * Attributes
		 */
		self.rootElement = undefined;
		self.metaModel = undefined;
		self.metaModelMetaData = undefined;
		self.metaModelRootPackage = undefined;
		self.loading = true;

		/**
		 * Public Methods
		 */
		self.onRootElementSelected = __onRootElementSelected;


		init();

		function init() {
			EcoreDecoratorsRepoService.clearElements();

			if ($stateParams.metaModelId != null) {
				self.metaModelId = $stateParams.metaModelId;
				__loadMetaModel();
			} else {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Choose a metamodel first!')
						.hideDelay(3000)
				);
				$state.go(MODELS.ROUTES.metaModelSelector)
			}
		}

		function __loadMetaModel() {
			var resourceSet = Ecore.ResourceSet.create();
			metaModelsService.loadById(self.metaModelId)
				.then(function (metaModelMetaData) {
					metaModelsService.loadFile(self.metaModelId)
						.then(function (metaModel) {
							try {
								var initModel = function (model) {
									var contents = model.get('contents');

									self.metaModelRootPackage = contents.first();
									self.metaModelMetaData = metaModelMetaData;
									self.metaModel = model;
									__onMetaModelLoaded();
								}
								self.resource = resourceSet.create({uri: metaModelMetaData.uri[0]});
								self.resource.load(metaModel, initModel);
								self.modelIsSupported = true;
							} catch (e) {
								self.modelIsSupported = false;
							}
						})
				})
		}

		function __onMetaModelLoaded() {
			EcoreDecoratorsRepoService
				.getDecorator(ECORE_DECORATOR.TREE_DECORATORS_PREFIX + self.metaModelRootPackage.eClass.values.name)
				.decorate(self.metaModelRootPackage)
			self.loading = false;
		}


		function __onRootElementSelected(element) {

			$mdToast.show(
				$mdToast.simple()
					.textContent(element.values.name + ' selected')
					.hideDelay(3000)
			);
			self.rootElement = element.create();
			self.selectedElement = self.rootElement;
		}


	}

})();

