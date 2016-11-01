/**
 * Created by nicolasacco on 25/09/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModelsEditor')
		.controller('MetaModelsEditorController', MetaModelsEditorController);

	/* @ngInject */
	function MetaModelsEditorController($stateParams,
										$rootScope,
										metaModelsService,
										META_MODELS_EDITOR) {

		var self = this;

		self.editingPackage = undefined;

		self.init = init;


		self.PANELS_MODE_AS_CARD = {
			label: 'as card',
			value: 'asCard'
		};
		self.PANELS_MODE_AS_SIDENAV = {
			label: 'as sidenav',
			value: 'asSidenav'
		};

		self.EDITOR_MODE_AS_TREE = {
			label: 'as tree',
			value: 'asTree'
		}


		self.ORIENTATION_ROW = 'row';
		self.ORIENTATION_COLUMN = 'column';

		self.settings = {
			orientation: self.ORIENTATION_ROW,
			panels: {
				mode: self.PANELS_MODE_AS_CARD
			},
			editor: {
				mode: self.EDITOR_MODE_AS_TREE
			}
		}


		init();


		function init() {

			var resourceSet = Ecore.ResourceSet.create();
			metaModelsService.loadMetaModel($stateParams.modelId)
				.then(function (metaModel) {

					var initModel = function (model) {
						self.editingPackage = model.get('contents').first();
						self.selectedElement = self.editingPackage;
					}

					self.resource = resourceSet.create({uri: '/model.json'});

					self.resource.load(metaModel.data, initModel);
				})
		}

	} // fine controller

})();

