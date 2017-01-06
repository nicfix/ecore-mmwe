/*!
* mmwe - v0.0.1 - MIT LICENSE 2016-10-26. 
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
		'metaModels',
		'treeEcore'
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
	.module('metaModels', ['metaModelsEditor', 'metaModelsBrowser']);



/**
 * Created by nicolasacco on 25/09/16.
 */
angular
	.module('metaModelsBrowser', [])
	.constant('META_MODELS_BROWSER', {
		BASE_PATH: '/app/modules/metaModelsBrowser'
	});


/**
 * Created by nicolasacco on 25/09/16.
 */
angular
	.module('metaModelsEditor', ['treeEcore', 'treeControl', 'md.data.table', 'picardy.fontawesome', 'uuid'])
	.constant('META_MODELS_EDITOR',
	{
		'EVENTS': {
			'MODEL_UPDATE_EVENT': 'META_MODELS_EDITOR.EVENTS.MODEL_UPDATE_EVENT'
		},
		'BASE_PATH': '/app/modules/metaModelsEditor'
	});

/**
 * Created by nicolasacco on 25/09/16.
 */
angular
	.module('treeEcore', ['uuid'])



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
	.constant('META_MODELS', {
		'ROUTES': {
			'metaModelsList': 'home.metaModels.metaModelsList',
			'metaModelsEditor': 'home.metaModels.metaModelsEditor'
		}
	})
	.config(['$stateProvider', function ($stateProvider) {

		var META_MODELS = {
			'ROUTES': {
				'metaModelsList': 'home.metaModels.metaModelsList',
				'metaModelsEditor': 'home.metaModels.metaModelsEditor'
			}
		}

		$stateProvider
			.state('home.metaModels', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/metaModels/metaModels.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state(META_MODELS.ROUTES.metaModelsEditor, {
				url: '/metaModelsEditor/:modelId',
				controller: 'MetaModelsEditorController',
				controllerAs: 'ctrl',
				templateUrl: 'app/modules/metaModelsEditor/metaModelsEditor.html'
			})
			.state(META_MODELS.ROUTES.metaModelsList, {
				url: '/metaModelsList',
				controller: 'MetaModelsListController',
				controllerAs: 'ctrl',
				templateUrl: 'app/modules/metaModelsBrowser/metaModelsList.html'
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

	Home.$inject = ['homeService', '$timeout'];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function Home(homeService, $timeout) {
		/*jshint validthis: true */
		var vm = this;


		vm.original_title = "Welcome to MMWE";

		vm.title = '';
		var index = 0;


		vm.subtitle = "DISIM's Meta Model Web Editor";
		vm.version = "1.0.0";

		__typeTitle(index, 500);

		vm.listFeatures = homeService.getFeaturesList();

		function __typeTitle(index, delay_constant) {
			vm.title = vm.title.replace('|', '')
			if (index < vm.original_title.length) {
				vm.title += vm.original_title.charAt(index) + '|';

				$timeout(function () {
					__typeTitle(index + 1, delay_constant)
				}, delay_constant * Math.random())
			}

		}

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

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog) {
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
				clickOutsideToClose: true
			})
				.then(function (answer) {
					$mdToast.show(
						$mdToast.simple()
							.content('You said the information was "' + answer + '".')
							.position('top right')
							.hideDelay(2000)
					);

				}, function () {
					$mdToast.show(
						$mdToast.simple()
							.content('You cancelled the dialog.')
							.position('top right')
							.hideDelay(2000)
					);
				});

			function DialogController($scope, $mdDialog) {
				$scope.hide = function () {
					$mdDialog.hide();
				};

				$scope.cancel = function () {
					$mdDialog.cancel();
				};

				$scope.answer = function (answer) {
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

		vm.title = '';

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

	SidenavCtrl.$inject = ['$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', 'MenuService', '$scope', '$timeout', '$interval'];
	SettingsCtrl.$inject = ['$mdBottomSheet'];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function SidenavCtrl($mdSidenav, $state, $mdBottomSheet, $mdToast, MenuService, $scope, $timeout, $interval) {
		/*jshint validthis: true */
		var vm = this;

		vm.original_title = 'mmwe';
		vm.title = '';

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.closeSidenav = function () {
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

		$timeout(function () {
			__typeTitle(0, 1000)
		}, 2000)

		$interval(function () {
			vm.title = '';
			try {
				$interval.cancel(vm.blink_interval)
			} catch (e) {

			}
			$timeout(function () {
				__typeTitle(0, 1000)
			}, 1000)
		}, 10000)


		function __typeTitle(index, delay_constant) {

			vm.title = vm.title.replace('|', '')
			if (index < vm.original_title.length) {
				vm.title += vm.original_title.charAt(index) + '|';

				$timeout(function () {
					__typeTitle(index + 1, delay_constant)
				}, delay_constant * Math.random())
			} else {
				vm.title += '   ';
				vm.blink_interval = $interval(function () {
					if (vm.title.indexOf('|') == -1) {
						vm.title += '|'
					}
					else {
						vm.title = vm.title.replace('|', '')
					}
				}, 1000)
			}

		}

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
		.module('metaModelsBrowser')
		.controller('MetaModelsListController', MetaModelsListController);

	/* @ngInject */
	function MetaModelsListController($state, metaModelsService, META_MODELS) {

		var self = this;

		/**
		 * Properties
		 *
		 */
		self.loading = true;
		self.items = [];

		/**
		 * Public methods, invokable in templates
		 */
		self.init = init;
		self.editMetamodel = __editMetaModel;


		/**
		 * Invoking init at the creation of the controller.
		 */
		init();

		/**
		 * Starts loading for metamodels descriptions
		 */
		function init() {
			metaModelsService.loadMetaModelsMetaData({}).then(__onMetaModelsLoaded)
		}

		/**
		 * Assigns loaded meta models to items attribute then
		 * stops the loading
		 * @param meta_models
		 * @private
		 */
		function __onMetaModelsLoaded(meta_models) {

			self.items = meta_models;
			self.loading = false;
		}

		/**
		 * Handles the loading error,
		 * doing nothing, for now XD
		 * @param response
		 * @private
		 */
		function __onMetaModelsLoadingError(response) {

		}

		/**
		 * Redirects to the metaModelsEditor
		 * with the metaModel passed as parameter
		 * @param mm
		 * @private
		 */
		function __editMetaModel(mm) {

			$state.go(META_MODELS.ROUTES.metaModelsEditor, {modelId: mm.id})
		}

	} // fine controller

})();


/**
 * Created by nicolasacco on 25/09/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModelsEditor')
		.controller('MetaModelsEditorController', MetaModelsEditorController);

	/* @ngInject */
	function MetaModelsEditorController($scope, $stateParams, $rootScope, metaModelsService, ecoreTreeService, $http, META_MODELS_EDITOR) {

		var self = this;

		self.editingPackage = undefined;

		self.init = init;


		self.PANELS_MODE_AS_CARD = {
			label: 'as card',
			value: 'asCard'
		};
		self.PANELS_MODE_AS_SIDENAV = {
			label: 'as sidenav',
			value: 'asSidenav'
		};

		self.EDITOR_MODE_AS_TREE = {
			label: 'as tree',
			value: 'asTree'
		}


		self.ORIENTATION_ROW = 'row';
		self.ORIENTATION_COLUMN = 'column';

		self.settings = {
			orientation: self.ORIENTATION_ROW,
			panels: {
				mode: self.PANELS_MODE_AS_CARD
			},
			editor: {
				mode: self.EDITOR_MODE_AS_TREE
			}
		}


		init();


		function init() {

			metaModelsService.loadMetaModel($stateParams.modelId)
				.then(function (metaModel) {

					var initModel = function (model) {
						var ecorePackage = model.get('contents').first();
						self.editingPackage = ecoreTreeService.ecoreElementToTreeElement(ecorePackage, null);
						self.selectedElement = self.editingPackage;
					}


					var res = Ecore.Resource.create({uri: 'model.json'});

					res.load(metaModel.data, initModel);
				})
		}

		$rootScope.$on(META_MODELS_EDITOR.EVENTS.MODEL_UPDATE_EVENT, function () {

			var resourceSet = Ecore.ResourceSet.create();

			self.resource = resourceSet.create({uri: '/model.json'});

			self.resource.get('contents').add(ecoreTreeService.
				treeElementToEcoreElement(self.editingPackage, null));

			self.json = self.resource.to();

			console.log(self.json);
		});


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

		var STATUS_DONE = 'DONE';
		var STATUS_IN_PROGRESS = 'IN_PROGRESS';

		var list = [
			{"feature": "This Dashboard :)", status: STATUS_DONE},
			{"feature": "Meta Models Repository Browser", status: STATUS_DONE},
			{"feature": "Tree Editor for Meta Models", status: STATUS_DONE},
			{"feature": "Properties editor for Meta Models", status: STATUS_DONE},
			{"feature": "Meta Models Export in Ecore Json notation", status: STATUS_IN_PROGRESS},
			{"feature": "Integration with DISIM repository", status: STATUS_IN_PROGRESS},
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
			link: 'metaModels.metaModelsList',
			name: 'Meta Models',
			icon: 'folder'
		}];

		return {
			listMenu: function () {
				return menu;
			}
		};

	}

})();

(function () {
	'use strict';

	angular
		.module('metaModels')
		.service('metaModelsService', metaModelsService);

	/* @ngInject */
	function metaModelsService($q, $http, $timeout) {
		/**
		 * This service is used to load and post meta models from and to disim
		 * repository
		 * @type {string}
		 */


		/**
		 * Dummy data initialization, for demo purposes only
		 * @type {string}
		 */
		var example_metamodels_path = 'example_metamodels';

		var meta_models = [];

		for (var i = 1; i < 5; i++) {
			meta_models.push({
				id: i,
				name: 'Example ' + i,
				description: i + 'th example for metamodels web editor',
				url: example_metamodels_path + '/example' + i + '.json'
			})
		}

		return {


			/**
			 * This method is used to load the descriptions of all
			 * metamodels matching query
			 * @param query
			 * @returns {*}
			 */
			loadMetaModelsMetaData: function (query) {


				/**
				 * Preparing a deferred object
				 * @type {Deferred}
				 */
				var deferred = $q.defer();

				/**
				 * Simulating $http delay, for demo purposes only
				 */
				$timeout(function () {
					deferred.resolve(
						meta_models
					)
				}, 1000);


				return deferred.promise;

			},

			/**
			 * This method is used to load entirely a specific metaModel
			 * with a certain id
			 * @param id
			 */
			loadMetaModel: function (id) {


				var deferred = $q.defer();

				/**
				 * Simulating download of object,
				 * firstly retrieve the metaModel description json
				 * and after that download the model from file
				 */
				var mm = undefined;
				angular.forEach(meta_models, function (item) {
					if (item.id == id) {
						mm = item;
					}
				});

				if (!angular.isDefined(mm)) {
					deferred.reject()
				}
				else {

					/**
					 * Downloading data from the url specified in the mm item and inserting it in the
					 * complete_mm object
					 */
					$http.get(mm.url).then(function (response) {

						var complete_mm = angular.copy(mm);

						complete_mm.data = response.data;

						deferred.resolve(
							complete_mm
						)

					}, deferred.reject)
				}
				return deferred.promise;
			}
		}


	} // fine service

})();


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
				//_originalEcoreElement: ecoreElement
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


/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreEClassService', TreeEcoreEClassService);

	/* @ngInject */
	function TreeEcoreEClassService(ECORE_TYPES, TreeEcoreElementMixinService, TreeEcoreModelsRepoService, rfc4122) {

		var service = this;
		service = angular.extend(service, TreeEcoreElementMixinService);

		var classes_values = [];

		service.doGetSupportedChildrenTypes = function () {
			return [ECORE_TYPES.EReference, ECORE_TYPES.EAttribute, ECORE_TYPES.EOperation]
		};


		service.doEcoreToTree = function (ecoreElement, treeParent) {

			var elmt = {
				id: rfc4122.v4(),
				values: ecoreElement.values,
				//_originalEcoreElement: ecoreElement
			};

			elmt._type = ECORE_TYPES.EClass;
			elmt._parent = treeParent;


			elmt.values.eSuperTypes = ecoreElement.get('eSuperTypes').map(function (c) {
				return TreeEcoreModelsRepoService.getStrategyForEcoreElement(c).ecoreToTree(c, elmt);
			});

			elmt.children = ecoreElement.get('eAttributes').map(function (c) {
				return TreeEcoreModelsRepoService.getStrategyForEcoreElement(c).ecoreToTree(c, elmt);
			});

			elmt.children = elmt.children.concat(ecoreElement.get('eReferences').map(function (c) {
				return TreeEcoreModelsRepoService.getStrategyForEcoreElement(c).ecoreToTree(c, elmt);
			}));

			classes_values.push(elmt);

			return elmt;
		};

		service.doTreeToEcore = function (treeElement, ecoreParent) {
			var ecoreVersion = Ecore.EClass.create({
				name: treeElement.values.name
			});

			ecoreVersion.values = treeElement.values;

			var superTypes = new Ecore.EList(Ecore.EClass);

			angular.forEach(ecoreVersion.values.eSuperTypes, function (item) {
				superTypes.add(item);
			});

			ecoreVersion.values.eSuperTypes = superTypes;

			return ecoreVersion;
		};

		service.doGetFieldType = function (treeElement, field_name, model_base_package) {

		};

		service.doGetSupportedFieldValues = function (treeElement, field_name, model_base_package) {
			if (field_name == 'eSuperTypes') {
				return classes_values;
			}
		};

		service.doBuildNew = function (treeParent) {
			var ecoreVersion = Ecore.EClass.create({
				name: ''
			});
			return service.ecoreToTree(ecoreVersion, treeParent);
		};

		return service;

	} // fine service

})
();


/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreEOperationService', TreeEcoreEOperationService);


	/* @ngInject */
	function TreeEcoreEOperationService(ECORE_TYPES, TreeEcoreElementMixinService, TreeEcoreModelsRepoService, rfc4122) {

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
				//_originalEcoreElement: ecoreElement
			};

			elmt._type = ECORE_TYPES.EOperation;
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
			var ecoreVersion = Ecore.EOperation.create();
			return service.ecoreToTree(ecoreVersion, treeParent);
		};


		return service;

	} // fine service

})();


/**
 * Created by nicolasacco on 16/10/16.
 */
(function () {
	'use strict';

	angular
		.module('treeEcore')
		.service('TreeEcoreEPackageService', TreeEcoreEPackageService);

	/* @ngInject */
	function TreeEcoreEPackageService(ECORE_TYPES, TreeEcoreElementMixinService, TreeEcoreModelsRepoService, rfc4122) {

		var service = this;
		service = angular.extend(service, TreeEcoreElementMixinService);

		service.doGetSupportedChildrenTypes = function () {
			return [ECORE_TYPES.EPackage, ECORE_TYPES.EClass]
		};

		service.doEcoreToTree = function (ecoreElement, treeParent) {

			var elmt = {
				id: rfc4122.v4(),
				values: ecoreElement.values,
				//_originalEcoreElement: ecoreElement
			};

			elmt._type = ECORE_TYPES.EPackage;

			elmt._parent = treeParent;

			elmt.children = ecoreElement.get('eClassifiers').map(function (c) {
				return TreeEcoreModelsRepoService.getStrategyForEcoreElement(c).ecoreToTree(c, elmt);
			});

			return elmt
		};

		service.doTreeToEcore = function (treeElement, ecoreParent) {


			var ecoreVersion = Ecore.EPackage.create({
				name: treeElement.values.name,
				nsURI: treeElement.values.nsURI,
				nxPrefix: treeElement.values.nxPrefix
			});


			angular.forEach(ecoreVersion.children, function (child) {
				var ecoreChild = TreeEcoreModelsRepoService
					.getStrategyForTreeEcoreElement(child)
					.treeToEcore(child, ecoreVersion);

				ecoreVersion
					.get('eClassifiers')
					.add(ecoreChild);
			});

			return ecoreVersion;
		};

		service.doGetFieldType = function (treeElement, field_name, model_base_package) {

		};

		service.doGetSupportedFieldValues = function (treeElement, field_name, model_base_package) {

		};

		service.doBuildNew = function (treeParent) {
			var ecoreVersion = Ecore.EPackage.create({
				name: '',
				eClassifiers: []
			});
			return service.ecoreToTree(ecoreVersion, treeParent);
		};


		return service;

	} // fine service

})();


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
				//_originalEcoreElement: ecoreElement
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


/**
 * Created by nicolasacco on 15/10/16.
 */
(function () {
	'use strict';

	angular
		.module('metaModelsEditor')
		.directive('consolePanel', consolePanelDirective);

	/* @ngInject */
	function consolePanelDirective(META_MODELS_EDITOR) {
		var directive = {
			bindToController: true,
			controller: ConsolePanelController,
			controllerAs: 'ctrl',
			templateUrl: META_MODELS_EDITOR.BASE_PATH + '/consolePanel.html',
			restrict: 'EA',
			scope: {}
		};
		return directive;


	} // fine direttiva

	/* @ngInject */
	function ConsolePanelController($rootScope, ECORE_TREE_SERVICE_EVENTS) {

		var self = this;

		// proprietà
		self.logs = []

		// metodi
		self.init = init;

		init();

		// =============================================

		function init() {

		}

		$rootScope.$on(ECORE_TREE_SERVICE_EVENTS.LOG, function (evt, data) {
			self.logs.push(data);
		});

	} // fine controller

})();


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

