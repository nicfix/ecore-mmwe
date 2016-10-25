/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreElementMixinService', TreeEcoreElementMixinService);

	/* @ngInject */
	function TreeEcoreElementMixinService() {

		function NotImplementedError(message) {
			this.name = "NotImplementedError";
			this.message = (message || "");
		}

		NotImplementedError.prototype = Error.prototype;

		var mixin = {


			/**
			 * Returns the list of supported childrens for the implemented element
			 * @returns {Array}
			 */
			getSupportedChildrenTypes: function () {
				return this.doGetSupportedChildrenTypes();
			},

			/**
			 * Protected method, reimplement it
			 * @protected
			 */
			doGetSupportedChildrenTypes: function () {
				return [];
			},

			/**
			 * Converts an EcoreElemente to a TreeEcoreElement,
			 * if the treeParent is not null it sets the created element
			 * as a children of the passed treeParent.
			 *
			 * @param ecoreElement
			 * @param treeParent
			 * @returns {{}}
			 */
			ecoreToTree: function (ecoreElement, treeParent) {
				return this.doEcoreToTree(ecoreElement, treeParent);
			},

			/**
			 * Protected method, reimplement it
			 * @protected
			 */
			doEcoreToTree: function (ecoreElement, treeParent) {
				var e = new NotImplementedError("doEcoreToTree is not implemented yet");
				throw e;
			},

			/**
			 * Converts a TreeEcoreElement to an EcoreElement
			 * if the ecoreParent is not null it sets the created element
			 * as a children of the passed ecoreParent.
			 *
			 * @param treeElement
			 * @param ecoreParent
			 * @returns {{}}
			 */
			treeToEcore: function (treeElement, ecoreParent) {
				return this.doTreeToEcore(treeElement, ecoreParent);
			},

			/**
			 * Protected method, reimplement it
			 * @protected
			 */
			doTreeToEcore: function (treeElement, ecoreParent) {
				var e = new NotImplementedError("doTreeToEcore is not implemented yet");
				throw e;
			},

			/**
			 * Returns the Ecore Type for a given field of a given TreeEcoreElement
			 * it also uses model_base_package in order to inspect model for
			 * options
			 *
			 * @param treeElement
			 * @param field_name
			 * @param model_base_package
			 * @returns {{}}
			 */
			getFieldType: function (treeElement, field_name, model_base_package) {
				return this.doGetFieldType(treeElement, field_name, model_base_package);
			},

			/**
			 * Protected method, reimplement it
			 * @protected
			 */
			doGetFieldType: function (treeElement, field_name, model_base_package) {
				var e = new NotImplementedError("doGetFieldType is not implemented yet");
				throw e;
			},

			/**
			 * Returns the supported values for a given field of a given TreeEcoreElement
			 * it also uses model_base_package in order to inspect model for
			 * options
			 *
			 * @param treeElement
			 * @param field_name
			 * @param model_base_package
			 * @returns {{}}
			 */
			getSupportedFieldValues: function (treeElement, field_name, model_base_package) {
				return this.doGetSupportedFieldValues(treeElement, field_name, model_base_package);
			},

			/**
			 * Protected method, reimplement it
			 * @protected
			 */
			doGetSupportedFieldValues: function (treeElement, field_name, model_base_package) {
				var e = new NotImplementedError("doGetSupportedFieldValues is not implemented yet");
				throw e;
			},

			/**
			 * Builds a brand new EcoreElement and appends it to a treeParent
			 *
			 * @param treeParent
			 */
			buildNew: function (treeParent) {
				return this.doBuildNew(treeParent);
			},

			/**
			 * Protected method, reimplement it
			 * @protected
			 */
			doBuildNew: function (treeParent) {
				var e = new NotImplementedError("doBuildNew is not implemented yet");
				throw e;
			}


		}

		return mixin;

	} // fine service

})();

