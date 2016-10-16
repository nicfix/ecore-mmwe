/**
 * Created by nicolasacco on 25/09/16.
 */

angular.module('metaModels')
	.config(['$stateProvider', function ($stateProvider) {


		$stateProvider
			.state('metaModels', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/metaModels/metaModels.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('metaModels.metaModelsEditor', {
				url: '/metaModelsEditor',
				controller: 'MetaModelsEditorController',
				controllerAs: 'ctrl',
				templateUrl: 'app/modules/metaModels/metaModelsEditor.html'
			})
			.state('metaModels.metaModelsList', {
				url: '/metaModelsList',
				controller: 'MetaModelsListController',
				controllerAs: 'ctrl',
				templateUrl: 'app/modules/metaModels/metaModelsEditor.html'
			});

	}]);
