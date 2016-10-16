/**
 * Created by nicolasacco on 25/09/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModels')
		.controller('MetaModelsEditorController', MetaModelsEditorController);

	/* @ngInject */
	function MetaModelsEditorController($scope, ecoreTreeService) {

		var self = this;

		self.editingPackage = undefined;

		self.init = init;


		init();


		function init() {

			var resourceSet = Ecore.ResourceSet.create();
			self.resource = resourceSet.create({uri: '/model.json'});

			var ecorePackage = Ecore.EPackage.create({
				name: 'sample',
				nsURI: 'http://www.example.org/sample',
				nsPrefix: 'sample',
			});

			self.editingPackage = ecoreTreeService.ecoreElementToTreeElement(ecorePackage, null);
			self.resource.add(ecorePackage);
			self.selectedElement = self.editingPackage;

		}


	} // fine controller

})();

