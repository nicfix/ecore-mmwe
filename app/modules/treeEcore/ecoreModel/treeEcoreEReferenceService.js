/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreEReferenceService', TreeEcoreEReferenceService);

	/* @ngInject */
	function TreeEcoreEReferenceService(ECORE_TYPES, TreeEcoreElementMixinService, TreeEcoreModelsRepoService, rfc4122) {

		var service = this;
		service = angular.extend(service, TreeEcoreElementMixinService);

		service.doGetSupportedChildrenTypes = function () {
			return []
		};


		service.doEcoreToTree = function (ecoreElement, treeParent) {
			var elmt = {
				id: rfc4122.v4(),
				values: ecoreElement.values,
				_originalEcoreElement: ecoreElement
			};
			elmt._type = ECORE_TYPES.EReference;
			elmt._parent = treeParent;

			return elmt;
		};

		service.doTreeToEcore = function (treeElement, ecoreParent) {

		};

		service.doGetFieldType = function (treeElement, field_name, model_base_package) {

		};

		service.doGetSupportedFieldValues = function (treeElement, field_name, model_base_package) {
			if (field_name == 'eType') {
				var options = [];
				var classes = TreeEcoreModelsRepoService.getAllChildrensOfCertainType(model_base_package, ECORE_TYPES.EClass);
				angular.forEach(classes, function (item) {
					options.push({label: item.values.name, value: item});
				});
				return options;
			}
		};

		service.doBuildNew = function (treeParent) {
			var ecoreVersion = Ecore.EReference.create({
				name: '',
				upperBound: -1,
				containment: false
			});
			return service.ecoreToTree(ecoreVersion, treeParent);
		};


		return service;

	} // fine service

})();

