/**
 * Created by nicolasacco on 06/10/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModelsEditor')
		.directive('treeEcorePropertiesEditor', ecorePropertiesEditor);

	/* @ngInject */
	function ecorePropertiesEditor(META_MODELS_EDITOR) {
		var directive = {
			bindToController: true,
			controller: TreeEcorePropertiesEditorController,
			controllerAs: 'ctrl',
			templateUrl: META_MODELS_EDITOR.BASE_PATH + '/treeEcorePropertiesEditor.html',
			restrict: 'EA',
			scope: {
				rootTreeEcoreElement: '=',
				treeEcoreElement: '='
			}
		};
		return directive;


	} // fine direttiva

	/* @ngInject */
	function TreeEcorePropertiesEditorController($scope, treeEcoreService) {

		var self = this;

		self.values = {};

		// metodi
		self.init = init;

		self.isSupported = isSupported;

		self.hasOptions = hasOptions;
		self.listOptions = listOptions;
		self.getFieldType = getFieldType;
		self.isMultiple = isMultiple;
		self.notHimSelf = notHimSelf;

		init();

		// =============================================

		function init() {

		}

		function isSupported(property, value) {

			var excludedFields = [
				'eAnnotations',
				'eClassifiers',
				'eSubPackages',
				'eStructuralFeatures',
				'eOperations',
				'eAllStructuralFeatures',
				'eAllSuperTypes',
				'eAllSubTypes',
				'eAllAttributes',
				'eAllReferences',
				'eAllContainments',
				'eAttributes',
				'eReferences',
				'eIDAttribute',
				'iD',
				'defaultValueLiteral',
			]

			var isSupported = true;

			angular.forEach(excludedFields, function (field) {
				isSupported = isSupported && field != property;
			})

			isSupported = isSupported && !isFunction(value);

			return isSupported;
		}

		function isFunction(functionToCheck) {
			var getType = {};
			return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		}

		function getFieldType(field_name) {
			if (angular.isDefined(treeEcoreService.getFieldType(self.treeEcoreElement, field_name, self.rootTreeEcoreElement))) {
				var type = treeEcoreService.getFieldType(self.treeEcoreElement, field_name, self.rootTreeEcoreElement);
				return type;
			}
			else {
				return 'text';
			}
		}

		function hasOptions(field_name) {
			if (!angular.isDefined(self.values[field_name])) {
				self.values[field_name] = treeEcoreService.getSupportedFieldValues(self.treeEcoreElement, field_name, self.rootTreeEcoreElement)
			}

			return angular.isDefined(self.values[field_name]);
		}

		function listOptions(field_name) {
			if (!angular.isDefined(self.values[field_name])) {
				self.values[field_name] = treeEcoreService.getSupportedFieldValues(self.treeEcoreElement, field_name, self.rootTreeEcoreElement)
			}
			return self.values[field_name];
		}

		function isMultiple(field_name) {
			return angular.isArray(self.treeEcoreElement[field_name]);
		}

		function notHimSelf(option) {
			return self.treeEcoreElement.id !== option.id;
		}


		$scope.$watch('ctrl.treeEcoreElement', function () {
			self.values = {};
		});
	} // fine controller

})();

