/**
 * Created by nicolasacco on 27/09/16.
 */

(function () {
	'use strict';

	angular
		.module('metaModelsEditor')
		.directive('treeEcoreEditor', treeEcoreEditor);

	/* @ngInject */
	function treeEcoreEditor(META_MODELS_EDITOR) {
		var directive = {
			bindToController: true,
			controller: TreeEcoreEditorController,
			controllerAs: 'ctrl',
			templateUrl: META_MODELS_EDITOR.BASE_PATH + '/treeEcoreEditor.html',
			restrict: 'EA',
			scope: {
				treeEcoreElement: '=',
				selectedElement: '=?'
			}
		};
		return directive;


	} // fine direttiva

	/* @ngInject */
	function TreeEcoreEditorController($scope, ecoreTreeService, ECORE_TYPES, $mdDialog, $rootScope, META_MODELS_EDITOR) {

		var self = this;


		self.ECORE_TYPE_ICONS = {}

		self.ECORE_TYPE_ICONS[ECORE_TYPES.EPackage] = 'archive';

		self.ECORE_TYPE_ICONS[ECORE_TYPES.EClass] = 'class';

		self.ECORE_TYPE_ICONS[ECORE_TYPES.EAttribute] = 'list';

		self.ECORE_TYPE_ICONS[ECORE_TYPES.EReference] = 'swap_horiz';

		self.ECORE_TYPES = ECORE_TYPES;

		self.treeOptions = {
			dirSelectable: true,
			multiSelection: false,
			allowDeselect: false,
			injectClasses: {
				ul: "a1",
				li: "a2",
				liSelected: "a7",
				iExpanded: "a3",
				iCollapsed: "a4",
				iLeaf: "a5",
				label: "a6",
				labelSelected: "a8"
			}
		}

		// =============================================

		//self.dataForTheTree = [];
		self.expandedElements = [];

		self.supportedChildrenTypes = [];


		// metodi
		self.init = init;
		self.addChild = addChild;
		self.removeChild = removeChild;
		self.doCreateChild = doCreateChild;
		self.getSupportedChildrenTypes = getSupportedChildrenTypes;
		self.addChild = addChild;
		self.removeChild = removeChild;


		init();

		// =============================================

		function init() {
			__buildTree();
		}


		function __buildTree() {

			self.treeEcorePackage = [self.treeEcoreElement];
		}

		function addChild(element) {
			self.creatingElement = true;
			self.showPrerenderedDialog();
		}

		function doCreateChild(child_type) {

			var children = ecoreTreeService.buildTreeEcoreElement(child_type, self.selectedElement)

			self.selectedElement.children.push(
				children
			);

			self.creatingElement = false;
			$mdDialog.hide();
			self.expandedElements.push(self.selectedElement);
			self.selectedElement = children;
		}

		function getSupportedChildrenTypes() {
			return self.supportedChildrenTypes;
		}

		function removeChild(element) {
			self.selectedElement._parent.children.splice(self.selectedElement._parent.children.indexOf(element), 1);
		}

		$scope.$watch('ctrl.selectedElement', function (newVal) {
			self.supportedChildrenTypes = ecoreTreeService.getSupportedChildrenTypes(self.selectedElement);
			notifyUpdate();
		})

		self.showPrerenderedDialog = function (ev) {
			$mdDialog.show({
				controller: self,
				contentElement: '#addChildrenDialog',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			});
		};

		self.keyBuffer = [];

		function arrays_equal(a, b) {
			return !(a < b || b < a);
		}

		self.down = function (e) {
			console.log("Wooo!");
			self.keyBuffer.push(e.keyCode);

			var upUp = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
			console.log(self.keyBuffer);
			if (arrays_equal(upUp, self.keyBuffer)) {


			}
		};


		function notifyUpdate() {
			$rootScope.$broadcast(META_MODELS_EDITOR.EVENTS.MODEL_UPDATE_EVENT);
		}


	}

})
();

