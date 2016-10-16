/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreEClassService', TreeEcoreEClassService);

	/* @ngInject */
	function TreeEcoreEClassService(ECORE_TYPES, TreeEcoreElementMixinService, TreeEcoreModelsRepoService, rfc4122) {

		var service = this;
		service = angular.extend(service, TreeEcoreElementMixinService);

		var classes_values = [];

		service.doGetSupportedChildrenTypes = function () {
			return [ECORE_TYPES.EReference, ECORE_TYPES.EAttribute]
		};


		service.doEcoreToTree = function (ecoreElement, treeParent) {

			var elmt = {
				id: rfc4122.v4(),
				values: ecoreElement.values,
				_originalEcoreElement: ecoreElement
			};

			elmt._type = ECORE_TYPES.EClass;
			elmt._parent = treeParent;


			elmt.values.eSuperTypes = ecoreElement.get('eSuperTypes').map(function (c) {
				return TreeEcoreModelsRepoService.getStrategyForEcoreElement(c).ecoreToTree(c, elmt);
			});

			elmt.children = ecoreElement.get('eAttributes').map(function (c) {
				return TreeEcoreModelsRepoService.getStrategyForEcoreElement(c).ecoreToTree(c, elmt);
			});

			elmt.children = elmt.children.concat(ecoreElement.get('eReferences').map(function (c) {
				return TreeEcoreModelsRepoService.getStrategyForEcoreElement(c).ecoreToTree(c, elmt);
			}));

			classes_values.push(elmt)

			return elmt;
		};

		service.doTreeToEcore = function (treeElement, ecoreParent) {

		};

		service.doGetFieldType = function (treeElement, field_name, model_base_package) {

		};

		service.doGetSupportedFieldValues = function (treeElement, field_name, model_base_package) {
			if (field_name == 'eSuperTypes') {
				return classes_values;
			}
		};

		service.doBuildNew = function (treeParent) {
			var ecoreVersion = Ecore.EClass.create({
				name: ''
			});
			return service.ecoreToTree(ecoreVersion, treeParent);
		};

		return service;

	} // fine service

})();

