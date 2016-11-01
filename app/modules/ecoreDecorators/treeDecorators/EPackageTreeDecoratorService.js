(function () {
	'use strict';

	angular
		.module('ecoreDecorators')
		.service('EPackageTreeDecoratorService', EPackageTreeDecoratorService);

	/* @ngInject */
	function EPackageTreeDecoratorService(EcoreElementTreeDecoratorMixinService,
										  ECORE_TYPES,
										  rfc4122) {

		var service = {}

		service = angular.extend(service, EcoreElementTreeDecoratorMixinService);

		service.decorate = function (ecoreElement) {
			ecoreElement.id = rfc4122.v4();

			var classifiers = ecoreElement.get('eClassifiers').map(function (c) {
				return service.getDecoratorByElement(c).decorate(c);
			});

			var subPackages = ecoreElement.get('eSubPackages').map(function (c) {
				return service.getDecoratorByElement(c).decorate(c);
			});

			ecoreElement.supportedChildrenTypes = [
				ECORE_TYPES.EPackage,
				ECORE_TYPES.EClass,
			]

			ecoreElement.children = classifiers.concat(subPackages);

			ecoreElement.newChildren = function (typeName) {

				var newEl = service.getDecoratorByTypeName(typeName).buildNew(parent);

				ecoreElement.children.push(newEl);

				if (typeName == ECORE_TYPES.EPackage)
					ecoreElement.get('eSubPackages').add(newEl);


				if (typeName == ECORE_TYPES.EClass)
					ecoreElement.get('eClassifiers').add(newEl);
			}

			ecoreElement.removeChildren = function (child) {
				if (child.eClass.values.name == ECORE_TYPES.EClass)
					ecoreElement.get('eClassifiers').remove(child);

				if (child.eClass.values.name == ECORE_TYPES.EPackage)
					ecoreElement.get('eSubPackages').remove(child);

				angular.forEach(ecoreElement.children, function (item, index) {
					if (item.id == child.id) {
						ecoreElement.children.splice(index, 1)
					}
				})
			}

			return ecoreElement

		};

		service.buildNew = function (parent) {
			var newEl = Ecore.EPackage.create({
					name: 'aPackage',
					eContainer: parent
				}
			)
			return service.getDecoratorByElement(newEl).decorate(newEl);
		}


		return service;

	}

})();

