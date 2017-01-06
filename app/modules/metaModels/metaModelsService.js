(function () {
	'use strict';

	angular
		.module('metaModels')
		.service('metaModelsService', metaModelsService);

	/* @ngInject */
	function metaModelsService($q, $mdToast, mdeForgeClientService) {
		/**
		 * This service is used to load and post meta models from and to disim
		 * repository
		 * @type {string}
		 */


		var client = mdeForgeClientService.getInstance();

		var META_MODELS_PATH_URL = 'api/EcoreMetamodel';

		var ARTIFACTS_PATH_URL = 'api/Artifact'

		/**
		 * Dummy data initialization, for demo purposes only
		 * @type {string}
		 */
		var example_metamodels_path = 'example_metamodels';


		return {


			searchMetaModelsMetaData: function (search) {
				var deferred = $q.defer();

				mdeForgeClientService.getInstance()
					.doGetRequest(ARTIFACTS_PATH_URL + '/search/' + search)
					.then(
						function (response) {
							deferred.resolve(response.data);
						}, deferred.reject
					);

				return deferred.promise
			},

			/**
			 * This method is used to load the descriptions of all
			 * metamodels matching query
			 * @param query
			 * @returns {*}
			 */
			loadMetaModelsMetaData: function (query, folder) {
				var deferred = $q.defer();

				if (angular.isUndefined(folder)) {
					folder = 'shared'
				}

				mdeForgeClientService.getInstance()
					.doGetRequest(META_MODELS_PATH_URL + '/' + folder + '?limit=10')
					.then(
						function (response) {
							deferred.resolve(response.data);
						}, deferred.reject
					);

				return deferred.promise
			},


			/**
			 * This method is used to load entirely a specific metaModel
			 * with a certain id
			 * @param id
			 */
			loadMetaModelMetaData: function (id) {

				var deferred = $q.defer();

				/**
				 * Simulating download of object,
				 * firstly retrieve the metaModel description json
				 * and after that download the model from file
				 */
				mdeForgeClientService.getInstance()
					.doGetRequest(META_MODELS_PATH_URL + '/' + id)
					.then(
						function (response) {
							deferred.resolve(response.data);
						}, deferred.reject
					);

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
				mdeForgeClientService.getInstance()
					.doGetRequest(META_MODELS_PATH_URL + '/metamodelJsonFormat/' + id)
					.then(
						function (response) {
							deferred.resolve(response.data);
						}, deferred.reject
					);

				return deferred.promise;
			},

			/**
			 * This method is used to load entirely a specific metaModel
			 * with a certain id
			 * @param id
			 */
			deleteMetaModel: function (id) {

				var deferred = $q.defer();

				/**
				 * Simulating download of object,
				 * firstly retrieve the metaModel description json
				 * and after that download the model from file
				 */
				mdeForgeClientService.getInstance()
					.doDeleteRequest(META_MODELS_PATH_URL + '/' + id + '/')
					.then(
						function (response) {
							deferred.resolve(response.data);
						}, deferred.reject
					);

				return deferred.promise;
			},

			/**
			 * This method is used to store entirely a specific metaModel
			 * @param data
			 */
			storeMetaModel: function (data) {

				var deferred = $q.defer();

				/**
				 * If id exists than we have to update, if not we have to post
				 * @see REST specification & guidelines
				 */
				if (angular.isDefined(data.id)) {

					mdeForgeClientService.getInstance()
						.doPutRequest(META_MODELS_PATH_URL, data)
						.then(
							function (response) {
								$mdToast.show($mdToast.simple().textContent('Stored :)'));
								deferred.resolve(response.data);
							}, deferred.reject
						);

				} else {
					mdeForgeClientService.getInstance()
						.doPostRequest(META_MODELS_PATH_URL, data)
						.then(
							function (response) {
								$mdToast.show($mdToast.simple().textContent('Stored :)'));
								deferred.resolve(response.data);
							}, deferred.reject
						);
				}

				return deferred.promise;
			}
		}


	} // fine service

})();

