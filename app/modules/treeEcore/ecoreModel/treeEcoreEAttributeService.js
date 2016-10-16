/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreEAttributeService', TreeEcoreEAttributeService);


	/* @ngInject */
	function TreeEcoreEAttributeService(ECORE_TYPES, TreeEcoreElementMixinService, TreeEcoreModelsRepoService, rfc4122) {

		var service = this;
		service = angular.extend(service, TreeEcoreElementMixinService);

		var BOOLEAN_NOT_NULL = [
			{label: true, value: true},
			{label: false, value: false}
		]

		var BASE_TYPES = [
			{label: ECORE_TYPES.EBoolean, value: Ecore.EBoolean},
			{label: ECORE_TYPES.EInt, value: Ecore.EInt},
			{label: ECORE_TYPES.EFloat, value: Ecore.EFloat},
			{label: ECORE_TYPES.EDouble, value: Ecore.EDouble},
			{label: ECORE_TYPES.EString, value: Ecore.EString},
			{label: ECORE_TYPES.EDate, value: Ecore.EDate}
		]


		service.SUPPORTED_FIELD_VALUES = {
			'eType': BASE_TYPES,
			'ordered': angular.copy(BOOLEAN_NOT_NULL),
			'unique': angular.copy(BOOLEAN_NOT_NULL),
			'changeable': angular.copy(BOOLEAN_NOT_NULL),
			'volatile': angular.copy(BOOLEAN_NOT_NULL),
			'transient': angular.copy(BOOLEAN_NOT_NULL),
			'unsettable': angular.copy(BOOLEAN_NOT_NULL),
			'derived': angular.copy(BOOLEAN_NOT_NULL)
		};

		var DEFAULT_TYPE = 'text';

		service.SUPPORTED_FIELD_TYPES = {
			'lowerBound': 'number',
			'upperBound': 'number',
			'name': 'text'
		}


		service.doGetSupportedChildrenTypes = function () {
			return []
		};


		service.doEcoreToTree = function (ecoreElement, treeParent) {
			var elmt = {
				id: rfc4122.v4(),
				values: ecoreElement.values,
				_originalEcoreElement: ecoreElement
			};

			elmt._type = ECORE_TYPES.EAttribute;
			elmt._parent = treeParent;


			return elmt;
		};

		service.doTreeToEcore = function (treeElement, ecoreParent) {

		};

		service.doGetFieldType = function (treeElement, field_name, model_base_package) {
			var type = DEFAULT_TYPE;
			if (angular.isDefined(service.SUPPORTED_FIELD_TYPES[field_name])) {
				type = service.SUPPORTED_FIELD_TYPES[field_name];
			}
			return type;
		};

		service.doGetSupportedFieldValues = function (treeElement, field_name, model_base_package) {
			var values = undefined;
			if (angular.isDefined(service.SUPPORTED_FIELD_VALUES[field_name])) {
				values = service.SUPPORTED_FIELD_VALUES[field_name];
			}
			return values;
		};

		service.doBuildNew = function (treeParent) {
			var ecoreVersion = Ecore.EAttribute.create({
				name: '',
				upperBound: 1,
				eType: Ecore.EString
			});
			return service.ecoreToTree(ecoreVersion, treeParent);
		};


		return service;

	} // fine service

})();

