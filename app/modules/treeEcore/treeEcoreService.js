/**
 * Created by nicolasacco on 04/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('ecoreTreeService', treeEcoreService)
		.service('treeEcoreService', treeEcoreService)
		.constant('ECORE_TYPES', {

			/**
			 *
			 */
			EPackage: "EPackage",

			/**
			 *
			 */
			EClass: "EClass",

			/**
			 *
			 */
			EAttribute: "EAttribute",

			/**
			 *
			 */
			EReference: "EReference",

			/**
			 *
			 */
			EOperation: "EOperation",

			/**
			 *
			 */
			EChar: "EChar",

			/**
			 *
			 */
			EString: "EString",

			/**
			 *
			 */
			EInt: "EInt",

			/**
			 *
			 */
			EFloat: "EFloat",

			/**
			 *
			 */
			EDouble: "EDouble",

			/**
			 *
			 */
			EBoolean: "EBoolean",

			/**
			 *
			 */
			EByte: "EByte",

			/**
			 *
			 */
			EDate: "EDate"
		})
		.constant('ECORE_TREE_SERVICE_EVENTS', {
			/**
			 *
			 */
			LOG: 'LOG'
		})


	/* @ngInject */
	/**
	 * This service converts a Ecore Model
	 * in a TreeEcore Model.
	 *
	 * TreeEcore Model is a simplyfied version of the EcoreModel
	 * suitable for tree and graphic representation in Angular Scope.
	 *
	 *
	 * @returns {treeEcoreService}
	 */
	function treeEcoreService(ECORE_TREE_SERVICE_EVENTS,
							  ECORE_TYPES,
							  $rootScope,
							  TreeEcoreModelsRepoService,
							  TreeEcoreEPackageService,
							  TreeEcoreEClassService,
							  TreeEcoreEReferenceService,
							  TreeEcoreEAttributeService,
							  TreeEcoreEOperationService) {

		var service = this;

		/**
		 * Enables logging in console for the conversion
		 * @type {boolean}
		 */
		service.DEBUG = true;


		/**
		 *
		 * @param element_type
		 * @param treeParent
		 * @returns {*}
		 */
		service.buildTreeEcoreElement = buildTreeEcoreElement;

		/**
		 * This method takes an Ecore element and converts it to a TreeEcore element,
		 * it takes a treeParent TreeEcore element in order to set the _parent attribute to
		 * the returned TreeEcore child.
		 *
		 * The treeParent could be null or a TreeEcore element.
		 *
		 * The type of TreeEcore element that has to be created is automatically recognized
		 * by the method and in case of nested elements the conversion navigates the
		 * childrens of the Ecore element automatically.
		 *
		 * As example, given a ecoreElement of type EPackage with a child of type EClass, the method returns a
		 * TreeEcore element as follows:
		 *    {
		 * 		_type : 'EPackage',
		 * 		_parent : null,
		 * 		children : [
		 * 			{
		 * 				_type: 'EClass',
		 * 				_parent: { ... reference to external object, it causes a circular reference ... },
		 * 				children : [
		 * 					...
		 *				],
		 *				_values: { ... original Ecore element values object ... }
		 *
		 *			}
		 * 		],
		 *		_values: { ... original Ecore element values object ... }
		 * 	 }
		 *
		 * @param ecoreElement : {} ,  Ecore element
		 * @param treeParent : {} ,  TreeEcore element
		 * @returns {*}
		 */
		service.ecoreElementToTreeElement = ecoreElementToTreeElement;

		/**
		 *
		 * @param treeElement
		 * @param ecoreParent
		 * @returns {*}
		 */
		service.treeElementToEcoreElement = treeElementToEcoreElement;

		/**
		 *
		 * @param treeEcoreElement
		 * @returns [{*}]
		 */
		service.getSupportedChildrenTypes = getSupportedChildrenTypes;

		/**
		 *
		 * @param treeEcoreElement
		 * @param field_name
		 * @param metamodel_base_package
		 * @returns {*|{}}
		 */
		service.getSupportedFieldValues = getSupportedFieldValues;

		/**
		 *
		 * @param treeEcoreElement
		 * @param field_name
		 * @param metamodel_base_package
		 * @returns {*|{}}
		 */
		service.getFieldType = getFieldType;

		/**
		 * Strategy for the EPackage Ecore type
		 * @type {{buildElement: Function}}
		 */
		TreeEcoreModelsRepoService.registerStrategy(ECORE_TYPES.EPackage, TreeEcoreEPackageService);

		/**
		 * Strategy for the EClass Ecore type
		 * @type {{ecoreToTree: Function, treeToEcore: Function}}
		 */
		TreeEcoreModelsRepoService.registerStrategy(ECORE_TYPES.EClass, TreeEcoreEClassService);

		/**
		 * Strategy for the EAttribute Ecore type
		 * @type {{ecoreToTree: Function, treeToEcore: Function}}
		 */
		TreeEcoreModelsRepoService.registerStrategy(ECORE_TYPES.EAttribute, TreeEcoreEAttributeService);

		/**
		 * Strategy for the EReference Ecore type
		 * @type {{ecoreToTree: Function, treeToEcore: Function}}
		 */
		TreeEcoreModelsRepoService.registerStrategy(ECORE_TYPES.EReference, TreeEcoreEReferenceService);


		/**
		 * Strategy for the EReference Ecore type
		 * @type {{ecoreToTree: Function, treeToEcore: Function}}
		 */
		TreeEcoreModelsRepoService.registerStrategy(ECORE_TYPES.EOperation, TreeEcoreEOperationService);


		function ecoreElementToTreeElement(ecoreElement, treeParent) {
			log("Decoding an EcoreElement of type: " + ecoreElement.eClass.values.name);
			return TreeEcoreModelsRepoService.getStrategyForEcoreElement(ecoreElement).ecoreToTree(ecoreElement, treeParent);
		}


		function treeElementToEcoreElement(treeElement, ecoreParent) {
			log("Decoding an TreeElement of type: " + treeElement._type);
			return TreeEcoreModelsRepoService.getStrategyForTreeEcoreElement(treeElement).treeToEcore(treeElement, ecoreParent);
		}

		function getFieldType(treeEcoreElement, field_name, metamodel_base_package) {
			var elmt_strategy = TreeEcoreModelsRepoService.getStrategyForTreeEcoreElement(treeEcoreElement);
			return elmt_strategy.getFieldType(treeEcoreElement, field_name, metamodel_base_package);
		}

		function getSupportedFieldValues(treeEcoreElement, field_name, metamodel_base_package) {
			var elmt_strategy = TreeEcoreModelsRepoService.getStrategyForTreeEcoreElement(treeEcoreElement);
			return elmt_strategy.getSupportedFieldValues(treeEcoreElement, field_name, metamodel_base_package);
		}

		function getSupportedChildrenTypes(treeEcoreElement) {
			var supportedChildrenTypes = [];

			if (angular.isDefined(treeEcoreElement)) {
				var elmt_strategy = TreeEcoreModelsRepoService.getStrategyForTreeEcoreElement(treeEcoreElement);
				if (angular.isDefined(elmt_strategy))
					supportedChildrenTypes = elmt_strategy.getSupportedChildrenTypes();
			}
			return supportedChildrenTypes;
		}

		function buildTreeEcoreElement(element_type, treeParent) {
			log("Building a new treeEcoreElement for type: " + element_type);
			return TreeEcoreModelsRepoService.getStrategy(element_type).buildNew(treeParent);
		}

		function log(message) {
			/**
			 * Broadcasting the message to all intrested subcomponents
			 */
			$rootScope.$broadcast(ECORE_TREE_SERVICE_EVENTS.LOG, {
				date: new Date(),
				source: 'EcoreTreeService',
				message: message
			});

			if (service.DEBUG == true)
				console.log("EcoreTreeService :> " + message)
		}

		return service;

	} // fine service

})
();

