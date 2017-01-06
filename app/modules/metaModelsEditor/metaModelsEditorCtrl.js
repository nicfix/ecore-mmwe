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
										$timeout,
										metaModelsService,
										$mdToast,
										META_MODELS) {

		var self = this;

		self.editingPackage = undefined;


		self.init = init;
		self.store = __store;
		self.delete = __delete;


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

			self.metaModelId = $stateParams.modelId;
			if (self.metaModelId != null && self.metaModelId != '') {
				__loadMetaModel();
			} else {
				__initNewMetaModel();
			}
		}


		function __loadMetaModel() {
			var resourceSet = Ecore.ResourceSet.create();
			self.title = self.metaModelId;

			metaModelsService.loadMetaModelMetaData(self.metaModelId)
				.then(function (metaModelMetaData) {
					metaModelsService.loadMetaModel(self.metaModelId)
						.then(function (metaModel) {
							try {
								var initModel = function (model) {
									self.editingPackage = model.get('contents').first();
									self.selectedElement = self.editingPackage;
									self.metaModel = metaModelMetaData;
								}
								self.resource = resourceSet.create({uri: metaModelMetaData.nsURI});
								self.resource.load(metaModel, initModel);
								self.modelIsSupported = true;
							} catch (e) {
								self.modelIsSupported = false;
							}
						})
				})
		}


		function __initNewMetaModel() {
			var resourceSet = Ecore.ResourceSet.create();
			self.metaModel = {
				_class: "org.mdeforge.business.model.EcoreMetamodel",
				name: 'aMetaModel.ecore',
				author: {},
				file: {
					fileName: ''
				}
			}

			self.resource = resourceSet.create({uri: '/model.json'});
			self.resource.get('contents').add(Ecore.EPackage.create({
				name: 'aPackage',
				nsPrefix: '',
				nsURI: ''
			}))

			self.editingPackage = self.resource.get('contents').first();
			self.selectedElement = self.editingPackage;
			self.modelIsSupported = true;
		}

		function __delete() {
			metaModelsService.deleteMetaModel(self.metaModel.id).then(function (response) {
				$state.go(META_MODELS.ROUTES.metaModelsEditor)
			})
		}

		function __store() {
			var mm = angular.copy(self.metaModel)
			var xmi = self.resource.to(Ecore.XMI, true);
			mm.file.content = btoa(xmi + '\n');

			if (mm.file.fileName != self.metaModel.name) {
				mm.file.fileName = self.metaModel.name;
			}
			else {
				mm.file.fileName += '_updated'
			}
			self.posting = true;

			metaModelsService.storeMetaModel(mm).then(function (response) {

				$timeout(function () {
					self.posting = false;
					self.metaModel = response;
				}, 1000);

			}, function () {
				self.posting = false;
			});
		}

	} // fine controller

})();

