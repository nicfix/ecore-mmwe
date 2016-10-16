/*!
* mmwe - v0.0.1 - MIT LICENSE 2016-10-09. 
* @author Nicola Sacco
*/
(function () {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main module of the application.
	 */

	angular.module('mmwe', [
		'ngResource',
		'ngAria',
		'ngMaterial',
		'ngMdIcons',
		'ngMessages',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ui.router',
		'home',
		'metaModels'
	]);

})();

(function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('mmwe')
		.config(configure)
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


		$urlRouterProvider
			.otherwise('/dashboard');

	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';

		console.log('AngularJS run() function...');
	}


})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.module:homeModule
	* @description
	* # homeModule
	* Module of the app
	*/

	angular.module('home', []);
})();

/**
 * Created by nicolasacco on 25/09/16.
 */
angular
	.module('metaModels', ['treeControl', 'md.data.table', 'picardy.fontawesome'])


'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('mmwe')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider

			.state('home', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('home.dashboard', {
				url:'/dashboard',
				templateUrl: 'app/modules/home/dashboard.html'
			});

	}]);


/**
 * Created by nicolasacco on 25/09/16.
 */

angular.module('metaModels')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('home.metaModelsEditor', {
				url: '/metaModelsEditor',
				controller: 'MetaModelsEditorController',
				controllerAs: 'ctrl',
				templateUrl: 'app/modules/metaModels/metaModelsEditor.html'
			})
			.state('home.metaModelsList', {
				url: '/metaModelsList',
				controller: 'MetaModelsListController',
				controllerAs: 'ctrl',
				templateUrl: 'app/modules/metaModels/metaModelsEditor.html'
			});

	}]);

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:HomeCtrl
	 * @description
	 * # HomeCtrl
	 * Controller of the app
	 */

	angular
		.module('mmwe')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService'];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function Home(homeService) {
		/*jshint validthis: true */
		var vm = this;



		vm.title = "Hello, mmwe!";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();

	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:LayoutCtrl
	* @description
	* # LayoutCtrl
	* Controller of the app
	*/

	angular
		.module('mmwe')
		.controller('LayoutCtrl', Layout);

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog ) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.changePassword = function () {
			$mdToast.show(
				$mdToast.simple()
				.content('Password clicked!')
				.position('top right')
				.hideDelay(2000)
			);
		};

		vm.changeProfile = function (ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'tabDialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				$mdToast.show(
					$mdToast.simple()
					.content('You said the information was "' + answer + '".')
					.position('top right')
					.hideDelay(2000)
				);

			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('You cancelled the dialog.')
					.position('top right')
					.hideDelay(2000)
				);
			});

			function DialogController($scope, $mdDialog) {
				$scope.hide = function() {
					$mdDialog.hide();
				};

				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};
			}
		};


		vm.logOut = function () {

			alert('Implement your Function Here');
			// $cookies.put('dev_appserver_login', ' ');
			//$state.go('out', {}, {reload: true});

		};

		var originatorEv;
		vm.openMenu = function ($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:SidenavCtrl
	* @description
	* # SidenavCtrl
	* Controller of the app
	*/
	angular
		.module('mmwe')
		.controller('SidenavCtrl', SidenavCtrl)
		.controller('SettingsCtrl', SettingsCtrl);

	// Injecting Denpendencies

	SidenavCtrl.$inject = ['$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', 'MenuService', '$scope'];
	SettingsCtrl.$inject = ['$mdBottomSheet'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function SidenavCtrl($mdSidenav, $state, $mdBottomSheet, $mdToast, MenuService, $scope) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.closeSidenav = function() {
			$mdSidenav('left').close();
		};

		// Close menu on small screen after click on menu item.
		// Only use $scope in controllerAs when necessary; for example, publishing and subscribing events using $emit, $broadcast, $on or $watch.
		$scope.$on('$stateChangeSuccess', vm.closeSidenav);

		vm.menu = MenuService.listMenu();

		vm.admin = [
			{
				link: 'showListBottomSheet($event)',
				title: 'Settings',
				icon: 'settings'
			}
		];

		vm.navigateTo = function (target) {

			var page = target;

			$state.go(page);

		};

		vm.showSettingsBottom = function ($event) {
			vm.alert = '';
			$mdBottomSheet.show({
				template: '<md-bottom-sheet class="md-grid" layout="column" ng-cloak><div layout="row" layout-align="center center"><h4>With clickOutsideToClose option, drag down or press ESC to close</h4></div><md-list flex layout="row" layout-align="center center"><md-list-item ng-repeat="item in vm.items"><md-button class="md-grid-item-content" ng-click="vm.listItemClick($index)"><md-icon class="md-48">{{item.icon}}</md-icon><div class="md-grid-text"> {{ item.name }} </div></md-button></md-list-item></md-list></md-bottom-sheet>',
				controller: 'SettingsCtrl',
				controllerAs: 'vm',
				targetEvent: $event
			}).then(function (clickedItem) {
				$mdToast.show(
					$mdToast.simple()
					.content(clickedItem.name + ' clicked!')
					.position('top right')
					.hideDelay(2000)
				);
			});
		};

	}

	function SettingsCtrl($mdBottomSheet) {
		/*jshint validthis: true */
		var vm = this;

		vm.items = [
			{name: 'Roles', icon: 'assignment_ind'},
			{name: 'Notes', icon: 'speaker_notes'},
			{name: 'Tasks', icon: 'view_list'},
			{name: 'Inbox', icon: 'inbox'}
		];

		vm.listItemClick = function ($index) {
			var clickedItem = vm.items[$index];
			$mdBottomSheet.hide(clickedItem);
		};
	}

})();

/**
 * Created by nicolasacco on 25/09/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModels')
		.controller('MetaModelsEditorController', MetaModelsEditorController);

	/* @ngInject */
	function MetaModelsEditorController($scope) {

		var self = this;

		self.init = init;

		init();

		function init() {


			var resourceSet = Ecore.ResourceSet.create();
			self.resource = resourceSet.create({uri: '/model.json'});


			var User = Ecore.EClass.create({
				name: 'User',
				eStructuralFeatures: [

					Ecore.EAttribute.create({
						name: 'name',
						upperBound: 1,
						eType: Ecore.EString
					}),

					Ecore.EReference.create({
						name: 'friends',
						upperBound: -1,
						containment: false,
						eType: function () {
							return User;
						}
					})
				]
			});

			var InnerPackage = Ecore.EPackage.create({
				name: 'inner',
				nsURI: 'http://www.example.org/sample',
				nsPrefix: 'sample',
				eClassifiers: []
			});

			self.SamplePackage = Ecore.EPackage.create({
				name: 'sample',
				nsURI: 'http://www.example.org/sample',
				nsPrefix: 'sample',
				eClassifiers: [
					User, InnerPackage
				]
			});


			self.resource.add(self.SamplePackage);

			self.selectedElements = [self.SamplePackage];

		}


	} // fine controller

})();


/**
 * Created by nicolasacco on 25/09/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModels')
		.controller('MetaModelsListController', MetaModelsListController);

	/* @ngInject */
	function MetaModelsListController() {

		var self = this;

		// =======================================================

		// costanti
		self.CONST = 'MY_CONST'

		// proprietà
		self.prop = 'myProp';

		// metodi
		self.init = init;


		init();

		// =======================================================

		function init() {

		}

	} // fine controller

})();


(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:homeService
	* @description
	* # homeService
	* Service of the app
	*/

	angular.module('mmwe')
		.factory('homeService', homeService);


	homeService.$inject = ['$http'];

	function homeService($http) {

		var list = [
			{"feature": "Implemented Best Practices, following: John Papa's Guide"},
			{"feature": "Using Controller AS syntax"},
			{"feature": "Wrap Angular components in an Immediately Invoked Function Expression (IIFE)"},
			{"feature": "Declare modules without a variable using the setter syntax"},
			{"feature": "Using named functions"},
			{"feature": "Including Unit test with Karma"},
			{"feature": "Including UI options for Bootstrap or Angular-Material"},
			{"feature": "Including Angular-Material-Icons for Angular-Material UI"},
			{"feature": "Dynamic Menu generator for both themes"},
			{"feature": "Grunt task for Production and Development"}
		];

		return {
			getFeaturesList: getFeaturesList
		};

		function getFeaturesList() {
			return list;
		}

	}

})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

	angular
		.module('mmwe')
		.factory('MenuService', Menu);

	// Inject your dependencies as .$inject = ['$http', '$otherDependency'];
	// function Name ($http, $otherDependency) {...}

	Menu.$inject = ['$http'];

	function Menu($http) {
		// Sample code.

		var menu = [{
			link: 'metaModelsEditor',
			name: 'MetaModelli'
		}];

		return {
			listMenu: function () {
				return menu;
			}
		};

	}

})();

/**
 * Created by nicolasacco on 04/10/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModels')
		.service('ecoreTreeService', treeEcoreService)
		.service('treeEcoreService', treeEcoreService)
		.constant('ECORE_TYPES', {
			EPackage: "EPackage",
			EClass: "EClass",
			EAttribute: "EAttribute",
			EReference: "EReference"
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
	function treeEcoreService(ECORE_TYPES) {

		var service = this;

		/**
		 * Enables logging in console for the conversion
		 * @type {boolean}
		 */
		service.DEBUG = true;

		/**
		 *
		 * @type {{}}
		 */
		var ECORE_TREE_MAPPING_STRATEGIES = {};


		/**
		 * Mapper for the EPackage Ecore type
		 * @type {{buildElement: Function}}
		 */
		ECORE_TREE_MAPPING_STRATEGIES[ECORE_TYPES.EPackage] = {

			ecoreToTree: function (ecoreElement, treeParent) {


				var elmt = {
					values: ecoreElement.values,
					_originalEcoreElement: ecoreElement
				};

				elmt._type = ECORE_TYPES.EPackage;
				elmt._icon = 'archive';
				elmt._parent = treeParent;
				elmt.children = ecoreElement.get('eClassifiers').map(function (c) {
					return service.ecoreElementToTreeElement(c, elmt);
				});

				return elmt
			},
			treeToEcore: function (treeElement, ecoreParent) {

			}
		}

		/**
		 * Mapper for the EClass Ecore type
		 * @type {{ecoreToTree: Function, treeToEcore: Function}}
		 */
		ECORE_TREE_MAPPING_STRATEGIES[ECORE_TYPES.EClass] = {
			ecoreToTree: function (ecoreElement, treeParent) {

				var elmt = {
					values: ecoreElement.values,
					_originalEcoreElement: ecoreElement
				};

				elmt._type = ECORE_TYPES.EClass;
				elmt._icon = 'class';
				elmt._parent = treeParent;
				elmt.children = ecoreElement.get('eAttributes').map(function (c) {
					return service.ecoreElementToTreeElement(c, elmt);
				});
				elmt.children = elmt.children.concat(ecoreElement.get('eReferences').map(function (c) {
					return service.ecoreElementToTreeElement(c, elmt);
				}));
				return elmt;
			},
			treeToEcore: function (treeElement, ecoreParent) {

			}
		}


		/**
		 * Mapper for the EAttribute Ecore type
		 * @type {{ecoreToTree: Function, treeToEcore: Function}}
		 */
		ECORE_TREE_MAPPING_STRATEGIES[ECORE_TYPES.EAttribute] = {
			ecoreToTree: function (ecoreElement, treeParent) {

				var elmt = {
					values: ecoreElement.values,
					_originalEcoreElement: ecoreElement
				};

				elmt._type = ECORE_TYPES.EAttribute;

				elmt._icon = 'list';

				elmt._parent = treeParent;


				return elmt;
			},
			treeToEcore: function (treeElement, ecoreParent) {

			}
		}

		/**
		 * Mapper for the EReference Ecore type
		 * @type {{ecoreToTree: Function, treeToEcore: Function}}
		 */
		ECORE_TREE_MAPPING_STRATEGIES[ECORE_TYPES.EReference] = {
			ecoreToTree: function (ecoreElement, treeParent) {

				var elmt = {
					values: ecoreElement.values,
					_originalEcoreElement: ecoreElement
				};

				elmt._type = ECORE_TYPES.EReference;
				elmt._icon = 'swap_horiz';
				elmt._parent = parent;
				return elmt;
			},
			treeToEcore: function (treeElement, ecoreParent) {

			}
		}


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
		this.ecoreElementToTreeElement = function (ecoreElement, treeParent) {
			service.log("Decoding an EcoreElement of type:" + ecoreElement.eClass.values.name);
			return ECORE_TREE_MAPPING_STRATEGIES[ecoreElement.eClass.values.name].ecoreToTree(ecoreElement, treeParent);
		}

		this.log = function (message) {
			if (service.DEBUG == true)
				console.log("EcoreTreeService :> ")
		}

		return service;

	} // fine service

})();


/**
 * Created by nicolasacco on 27/09/16.
 */

(function () {
	'use strict';

	angular
		.module('metaModels')
		.directive('treeEcoreEditor', treeEcoreEditor);

	/* @ngInject */
	function treeEcoreEditor() {
		var directive = {
			bindToController: true,
			controller: TreeEcoreEditorController,
			controllerAs: 'ctrl',
			templateUrl: '/app/modules/metaModels/treeEcoreEditor.html',
			restrict: 'EA',
			scope: {
				treeEcoreElement: '=',
				selectedElement: '=?'
			}
		};
		return directive;


	} // fine direttiva

	/* @ngInject */
	function TreeEcoreEditorController($scope, ecoreTreeService) {

		var self = this;


		$scope.treeOptions = {
			nodeChildren: "children",
			dirSelectable: true,
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

		self.dataForTheTree = [];

		// metodi
		self.init = init;
		self.addChild = addChild;
		self.removeChild = removeChild;


		init();

		// =============================================

		function init() {
			__buildTree();
		}


		function __buildTree() {
			var decodedTree = ecoreTreeService.ecoreElementToTreeElement(self.treeEcoreElement, null);
			self.dataForTheTree.splice(0, self.dataForTheTree.length);
			self.dataForTheTree.push(decodedTree);
		}

		function __onElementSelected(node, selected) {
			self.selectedElement = node;
		}

		function addChild(element) {
			self.creatingElement = true;
		}

		function doCreateChild(prototype) {

			/**
			 * TODO: Move implementation of the New element Creation to treeEcoreService
			 */
			self.selectedElement.children.push({
				values: {name: self.selectedElement.values.name + '_children'},
				_parent: self.selectedElement,
				children: []
			});

			self.creatingElement = false;
		}

		function removeChild(element) {
			self.selectedElement._parent.children.splice(self.selectedElement._parent.children.indexOf(element), 1);
		}

		self.onElementSelected = __onElementSelected;
		self.addChild = addChild;
		self.removeChild = removeChild;
	}

})
();


/**
 * Created by nicolasacco on 06/10/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModels')
		.directive('treeEcorePropertiesEditor', ecorePropertiesEditor);

	/* @ngInject */
	function ecorePropertiesEditor() {
		var directive = {
			bindToController: true,
			controller: TreeEcorePropertiesEditorController,
			controllerAs: 'ctrl',
			templateUrl: '/app/modules/metaModels/treeEcorePropertiesEditor.html',
			restrict: 'EA',
			scope: {
				treeEcoreElement: '='
			}
		};
		return directive;


	} // fine direttiva

	/* @ngInject */
	function TreeEcorePropertiesEditorController() {

		var self = this;

		// metodi
		self.init = init;

		self.isSupported = isSupported;

		init();

		// =============================================

		function init() {

		}

		function isSupported(property, value) {
			var excludedFields = [
				'eAnnotations',
				'eClassifiers',
				'eSubPackages',
				'eSuperTypes',
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
				'eType'
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

	} // fine controller

})();

