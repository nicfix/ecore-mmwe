/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('ModelRepoService', metaModelRepoService)
		.service('TreeEcoreModelsRepoService', metaModelRepoService);

	/* @ngInject */
	function metaModelRepoService() {

		/**
		 *
		 * @type {{}}
		 */
		var MAPPING_STRATEGIES = {}

		/**
		 *
		 * @type {string}
		 */
		var DEFAULT_METAMODEL_ID = 'ECORE';

		/**
		 *
		 * @type {{}}
		 */
		MAPPING_STRATEGIES[DEFAULT_METAMODEL_ID] = {};

		return {

			registerStrategy: function () {
				if (arguments.length == 2) {
					MAPPING_STRATEGIES[DEFAULT_METAMODEL_ID][arguments[0]] = arguments[1];
				} else {
					if (!angular.isDefined(MAPPING_STRATEGIES[arguments[0]])) {
						MAPPING_STRATEGIES[arguments[0]] = {};
					}
					MAPPING_STRATEGIES[arguments[0]][arguments[1]] = arguments[2];
				}
			},

			getStrategy: function () {
				if (arguments.length == 1) {
					return MAPPING_STRATEGIES[DEFAULT_METAMODEL_ID][arguments[0]]
				} else {
					return MAPPING_STRATEGIES[arguments[0]][arguments[1]]
				}
			},

			getStrategyForEcoreElement: function (metaModelID, metaModelElement) {
				if (arguments.length == 1) {
					return this.getStrategy(DEFAULT_METAMODEL_ID, arguments[0].eClass.values.name);

				} else {
					return this.getStrategy(arguments[0], arguments[1].eClass.values.name);
				}
			},

			getStrategyForTreeEcoreElement: function (metaModelID, treeEcoreElement) {
				if (arguments.length == 1) {
					return this.getStrategy(DEFAULT_METAMODEL_ID, arguments[0]._type);
				} else {
					return this.getStrategy(arguments[0], arguments[1]._type);
				}
			},

			getAllChildrensOfCertainType: function (ecoreRootElement, ecoreTreeType) {
				var elements = [];
				var self = this;

				angular.forEach(ecoreRootElement.children, function (item) {
					if (item._type == ecoreTreeType) {
						elements.push(item);
					}
					elements = elements.concat(self.getAllChildrensOfCertainType(item, ecoreTreeType));
				});

				return elements;
			}
		}
	}

})();

