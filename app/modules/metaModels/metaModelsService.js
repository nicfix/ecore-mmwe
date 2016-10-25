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
			loadMetaModels: function (query) {


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

