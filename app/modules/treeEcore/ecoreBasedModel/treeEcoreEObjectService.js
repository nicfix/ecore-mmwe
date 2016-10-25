/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreEObjectService', TreeEcoreElementMixinService);

	/* @ngInject */
	function TreeEcoreElementMixinService() {

		function NotImplementedError(message) {
			this.name = "NotImplementedError";
			this.message = (message || "");
		}

		NotImplementedError.prototype = Error.prototype;

		var mixin = {


			/**
			 * Protected method, reimplement it
			 * @protected
			 */
			doGetSupportedChildrenTypes: function () {
				return [];
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
			 * Protected method, reimplement it
			 * @protected
			 */
			doTreeToEcore: function (treeElement, ecoreParent) {
				var e = new NotImplementedError("doTreeToEcore is not implemented yet");
				throw e;
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
			 * Protected method, reimplement it
			 * @protected
			 */
			doGetSupportedFieldValues: function (treeElement, field_name, model_base_package) {
				var e = new NotImplementedError("doGetSupportedFieldValues is not implemented yet");
				throw e;
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

