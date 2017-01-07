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
									$timeout,
									modelsService,
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
			self.modelId = $stateParams.modelId;
			self.metaModelId = $stateParams.metaModelId;

			if (self.modelId != null && self.modelId != '') {
				__loadModel();
			} else {
				__initNewModel();
			}
		}


		function __loadModel() {
			var resourceSet = Ecore.ResourceSet.create();
			self.title = self.modelId;
			modelsService.loadById(self.modelId)
				.then(function (modelMetaData) {
					modelsService.loadFile(self.modelId)
						.then(function (model) {
							try {
								var initModel = function (model) {
									self.editingPackage = model.get('contents').first();
									self.selectedElement = self.editingPackage;
									self.model = modelMetaData;
								}
								self.resource = resourceSet.create({uri: modelMetaData.nsURI});
								self.resource.load(model, initModel);
								self.modelIsSupported = true;
							} catch (e) {
								self.modelIsSupported = false;
							}
						})
				})
		}


		function __initNewModel() {

			var resourceSet = Ecore.ResourceSet.create();
			self.model = {
				_class: "org.mdeforge.business.model.EcoreModel",
				name: 'aModel.ecore',
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
			modelsService.destroy(self.model.id).then(function (response) {
				$state.go(META_MODELS.ROUTES.modelsEditor)
			})
		}

		function __store() {
			var mm = angular.copy(self.model)
			var xmi = self.resource.to(Ecore.XMI, true);
			mm.file.content = btoa(xmi + '\n');

			if (mm.file.fileName != self.model.name) {
				mm.file.fileName = self.model.name;
			}
			else {
				mm.file.fileName += '_updated'
			}
			self.posting = true;

			modelsService.store(mm).then(function (response) {

				$timeout(function () {
					self.posting = false;
					self.model = response;
				}, 1000);

			}, function () {
				self.posting = false;
			});
		}
	}

})();

