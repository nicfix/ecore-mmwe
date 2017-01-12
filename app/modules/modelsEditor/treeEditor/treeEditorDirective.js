/**
 * Created by nicolasacco on 27/09/16.
 */

(function () {
	'use strict';

	angular
		.module('modelsEditor')
		.directive('decoratedTreeEcoreInstanceEditor', decoratedTreeEcoreInstanceEditor);

	/* @ngInject */
	function decoratedTreeEcoreInstanceEditor(MODELS_EDITOR) {
		var directive = {
			bindToController: true,
			controller: DecoratedTreeEcoreEditorController,
			controllerAs: 'ctrl',
			templateUrl: MODELS_EDITOR.BASE_PATH + '/treeEditor/treeEditor.html',
			restrict: 'EA',
			scope: {
				rootElement: '=',
				selectedElement: '=?'
			}
		};
		return directive;


	} // fine direttiva

	/* @ngInject */
	function DecoratedTreeEcoreEditorController($scope,
												ECORE_DECORATOR,
												EcoreDecoratorsRepoService,
												ECORE_TYPES,
												$mdDialog,
												$rootScope,
												META_MODELS_EDITOR, rfc4122) {

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
			equality: function (o1, o2) {
				return o1.id == o2.id;
			},
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
			self.tree = [
				self.rootElement
			]
		}

		function addChild(element) {
			self.creatingElement = true;
			self.showPrerenderedDialog();
		}

		function doCreateChild(child_type) {
			var newElement = child_type.values.eType.create();

			newElement.id = rfc4122.v4();

			self.selectedElement.values[child_type.values.name] = newElement;

			if (angular.isUndefined(self.selectedElement.children))
				self.selectedElement.children = []

			self.selectedElement.children.push(newElement);

			self.creatingElement = false;

			$mdDialog.hide();

			self.expandedElements.push(self.selectedElement);
			//self.selectedElement = newElement;

		}

		function getSupportedChildrenTypes() {

			var childTypes = [];
			if (angular.isDefined(self.selectedElement)) {
				childTypes = self.selectedElement.eClass.get('eReferences').map(function (c) {
					return c;
				});
			}
			return childTypes;

		}

		function removeChild() {

			var parent = self.selectedElement.eContainer;

			if (angular.isDefined(parent)) {
				parent.removeChildren(self.selectedElement);
				self.selectedElement = parent;
			}

		}

		$scope.$watch('ctrl.selectedElement', function (newVal) {
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

		function notifyUpdate() {
			$rootScope.$broadcast(META_MODELS_EDITOR.EVENTS.MODEL_UPDATE_EVENT);
		}

		self.export = function () {

			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(self.ecoreResource.to(), null, '  ')));
			element.setAttribute('download', 'export.json');

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		}


	}

})
();

