/**
 * Created by nicolasacco on 25/09/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModelsEditor')
		.controller('MetaModelsEditorController', MetaModelsEditorController);

	/* @ngInject */
	function MetaModelsEditorController($scope, $stateParams, $rootScope, metaModelsService, ecoreTreeService, $http, META_MODELS_EDITOR) {

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

			metaModelsService.loadMetaModel($stateParams.modelId)
				.then(function (metaModel) {

					var initModel = function (model) {
						var ecorePackage = model.get('contents').first();
						self.editingPackage = ecoreTreeService.ecoreElementToTreeElement(ecorePackage, null);
						self.selectedElement = self.editingPackage;
					}


					var res = Ecore.Resource.create({uri: 'model.json'});

					res.load(metaModel.data, initModel);
				})
		}

		$rootScope.$on(META_MODELS_EDITOR.EVENTS.MODEL_UPDATE_EVENT, function () {

			var resourceSet = Ecore.ResourceSet.create();

			self.resource = resourceSet.create({uri: '/model.json'});

			self.resource.get('contents').add(ecoreTreeService.
				treeElementToEcoreElement(self.editingPackage, null));

			self.json = self.resource.to();

			console.log(self.json);
		});


	} // fine controller

})();

