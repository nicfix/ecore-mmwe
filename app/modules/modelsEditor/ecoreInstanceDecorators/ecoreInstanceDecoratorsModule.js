/**
 * Created by nicolasacco on 25/09/16.
 */
angular
	.module('ecoreInstanceDecorators', ['uuid'])
	.constant('ECORE_INSTANCE_DECORATOR', {
		'TREE_DECORATORS_PREFIX': 'TREE_',
		'PROPERTIES_DECORATORS_PREFIX': 'PROPERTIES_'
	})
	.constant('ECORE_INSTANCE_TREE_SERVICE_EVENTS', {
		/**
		 *
		 */
		LOG: 'LOG'
	})

	.run(function (ECORE_TYPES,
				   EcoreDecoratorsRepoService,
				   ECORE_DECORATOR,
				   EPackageTreeDecoratorService,
				   EClassTreeDecoratorService,
				   EAttributeTreeDecoratorService,
				   EReferenceTreeDecoratorService,
				   EOperationTreeDecoratorService,
				   EPackagePropertiesDecoratorService,
				   EClassPropertiesDecoratorService,
				   EAttributePropertiesDecoratorService,
				   EReferencePropertiesDecoratorService,
				   EOperationPropertiesDecoratorService) {

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.TREE_DECORATORS_PREFIX + ECORE_TYPES.EOperation,
				EOperationTreeDecoratorService);

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.TREE_DECORATORS_PREFIX + ECORE_TYPES.EReference,
				EReferenceTreeDecoratorService);

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.TREE_DECORATORS_PREFIX + ECORE_TYPES.EAttribute,
				EAttributeTreeDecoratorService);

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.TREE_DECORATORS_PREFIX + ECORE_TYPES.EClass,
				EClassTreeDecoratorService);

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.TREE_DECORATORS_PREFIX + ECORE_TYPES.EPackage,
				EPackageTreeDecoratorService);

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.PROPERTIES_DECORATORS_PREFIX + ECORE_TYPES.EPackage,
				EPackagePropertiesDecoratorService)


		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.PROPERTIES_DECORATORS_PREFIX + ECORE_TYPES.EClass,
				EClassPropertiesDecoratorService)

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.PROPERTIES_DECORATORS_PREFIX + ECORE_TYPES.EAttribute,
				EAttributePropertiesDecoratorService)

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.PROPERTIES_DECORATORS_PREFIX + ECORE_TYPES.EReference,
				EReferencePropertiesDecoratorService)

		EcoreDecoratorsRepoService
			.registerDecorator(ECORE_DECORATOR.PROPERTIES_DECORATORS_PREFIX + ECORE_TYPES.EOperation,
				EOperationPropertiesDecoratorService)
	})




