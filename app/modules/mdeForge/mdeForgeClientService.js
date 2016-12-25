(function () {
	'use strict';

	angular
		.module('mdeForge')
		.service('mdeForgeClientService', mdeForgeClientService);

	/* @ngInject */
	function mdeForgeClientService($http, mdeForge_SERVER_URL) {

		var OAUTH_PATH = 'oauth/token/';

		var CLIENT_ID = 'my-trusted-client'


		return {
			getInstance: function () {
				var client = {}

				/**
				 *
				 * This private method builds the url for an OAuth request.
				 * @param username
				 * @param password
				 * @returns {string}
				 * @private
				 */
				client.__buildOAuthRequest = function (username, password) {
					var url = mdeForge_SERVER_URL + OAUTH_PATH;

					url += '?grant_type=password';
					url += '&client_id=' + CLIENT_ID;
					url += '&password=' + password;
					url += '&username=' + username;

					url = mdeForge_SERVER_URL + 'oauth/token?username=Admin&password=juri&grant_type=password&client_id=my-trusted-client'

					url = mdeForge_SERVER_URL + 'application.wadl/'

					return encodeURI(url);
				}

				/**
				 *
				 * @param username
				 * @param password
				 * @returns {HttpPromise}
				 */
				client.logIn = function (username, password) {

					var options = {
						url: client.__buildOAuthRequest(username, password),
						method: 'GET',
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Authorization': 'Basic'
						}
					}

					return $http(options);
				}

				return client;
			}
		};

	}

})();

