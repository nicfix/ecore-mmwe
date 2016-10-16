/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreEPackageService', TreeEcoreEPackageService);

	/* @ngInject */
	function TreeEcoreEPackageService(ECORE_TYPES, TreeEcoreElementMixinService, TreeEcoreModelsRepoService, rfc4122) {

		var service = this;
		service = angular.extend(service, TreeEcoreElementMixinService);

		service.doGetSupportedChildrenTypes = function () {
			return [ECORE_TYPES.EPackage, ECORE_TYPES.EClass]
		};

		service.doEcoreToTree = function (ecoreElement, treeParent) {

			var elmt = {
				id: rfc4122.v4(),
				values: ecoreElement.values,
				_originalEcoreElement: ecoreElement
			};

			elmt._type = ECORE_TYPES.EPackage;

			elmt._parent = treeParent;

			elmt.children = ecoreElement.get('eClassifiers').map(function (c) {
				return TreeEcoreModelsRepoService.getStrategyForEcoreElement(c).ecoreToTree(c, elmt);
			});

			return elmt
		};

		service.doTreeToEcore = function (treeElement, ecoreParent) {

		};

		service.doGetFieldType = function (treeElement, field_name, model_base_package) {

		};

		service.doGetSupportedFieldValues = function (treeElement, field_name, model_base_package) {

		};

		service.doBuildNew = function (treeParent) {

			var ecoreVersion = Ecore.EPackage.create({
				name: '',
				eClassifiers: []
			});
			return service.ecoreToTree(ecoreVersion, treeParent);
		};


		return service;

	} // fine service

})();

