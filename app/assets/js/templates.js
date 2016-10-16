angular.module('mmwe').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/home/dashboard.html',
    "<div class=\"md-padding\" flex layout-sm=\"column\">\n" +
    "    <md-card class=\"text-center\">\n" +
    "        <md-card-content>\n" +
    "            <h1>{{ vm.title }}</h1>\n" +
    "            <h3>{{ vm.version }}</h3>\n" +
    "            <p>This is a template for a simple home screen website. Use it as a starting point to create something more unique.</p>\n" +
    "            <code>app/modules/home/home.html</code>\n" +
    "            <br>\n" +
    "            <p><a href=\"http://www.github.com/newaeonweb/generator-angm\" class=\"btn btn-primary\" role=\"button\">Learn more »</a></p>\n" +
    "            <md-divider class=\"margin-top-20\"></md-divider>\n" +
    "            <h1 class=\"margin-top-50\">Features</h1>\n" +
    "            <ul>\n" +
    "                <li class=\" text-center\" ng-repeat=\"item in vm.listFeatures\">\n" +
    "                    <p><ng-md-icon icon=\"check\"></ng-md-icon> {{item.feature}}</p>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\"\n" +
    "			md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "	<div ng-controller=\"SidenavCtrl as vm\" ng-cloak>\n" +
    "		<md-toolbar class=\"md-tall md-hue-2\">\n" +
    "			<div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "				<div layout=\"row\">\n" +
    "					<div flex=\"80\" style=\"margin-top: 10px;\">\n" +
    "						<div>mmwe</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</md-toolbar>\n" +
    "		<md-list>\n" +
    "			<md-list-item ui-sref=\"home.dashboard\">\n" +
    "				<div class=\"inset\">\n" +
    "					<ng-md-icon icon=\"apps\"></ng-md-icon>\n" +
    "				</div>\n" +
    "				<p> Dashboard </p>\n" +
    "			</md-list-item>\n" +
    "			<md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo('home.' + item.link)\">\n" +
    "				<div class=\"inset\" ng-show=\"item.icon\">\n" +
    "					<ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "				</div>\n" +
    "				<p> {{ item.name }}</p>\n" +
    "			</md-list-item>\n" +
    "			<md-divider></md-divider>\n" +
    "			<md-subheader>Admin</md-subheader>\n" +
    "			<md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\">\n" +
    "				<div class=\"inset\">\n" +
    "					<ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "				</div>\n" +
    "				<p> {{ item.title }}</p>\n" +
    "			</md-list-item>\n" +
    "		</md-list>\n" +
    "	</div>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
    "	<md-toolbar ng-show=\"!showSearch\">\n" +
    "		<div class=\"md-toolbar-tools\">\n" +
    "			<md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "				<ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "			</md-button>\n" +
    "			<h3>mmwe</h3>\n" +
    "			<span flex></span>\n" +
    "			<md-button aria-label=\"Search\" ng-click=\"showSearch = !showSearch\">\n" +
    "				<ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "			</md-button>\n" +
    "			<md-menu>\n" +
    "				<md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "					<md-icon> more_vert</md-icon>\n" +
    "				</md-button>\n" +
    "				<md-menu-content width=\"4\">\n" +
    "					<md-menu-item>\n" +
    "						<md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "							<md-icon>face</md-icon>\n" +
    "							Profile\n" +
    "						</md-button>\n" +
    "					</md-menu-item>\n" +
    "					<md-menu-item>\n" +
    "						<md-button ng-click=\"layout.changePassword()\">\n" +
    "							<md-icon>lock</md-icon>\n" +
    "							Password\n" +
    "						</md-button>\n" +
    "					</md-menu-item>\n" +
    "					<md-menu-divider></md-menu-divider>\n" +
    "					<md-menu-item>\n" +
    "						<md-button ng-click=\"layout.logOut()\">\n" +
    "							<md-icon>power_settings_new</md-icon>\n" +
    "							Logout\n" +
    "						</md-button>\n" +
    "					</md-menu-item>\n" +
    "				</md-menu-content>\n" +
    "			</md-menu>\n" +
    "		</div>\n" +
    "	</md-toolbar>\n" +
    "	<md-toolbar class=\"md-hue-1\" ng-show=\"showSearch\">\n" +
    "		<div class=\"md-toolbar-tools\">\n" +
    "			<md-button ng-click=\"showSearch = !showSearch\" aria-label=\"Back\">\n" +
    "				<ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "			</md-button>\n" +
    "			<h3 flex=\"10\">\n" +
    "				Back\n" +
    "			</h3>\n" +
    "			<md-input-container md-theme=\"input\" flex>\n" +
    "				<label>&nbsp;</label>\n" +
    "				<input ng-model=\"search.who\" placeholder=\"Search ...\">\n" +
    "			</md-input-container>\n" +
    "		</div>\n" +
    "	</md-toolbar>\n" +
    "	<md-content layout=\"column\" flex md-scroll-y style=\"background-color:#DCDCDC\">\n" +
    "		<div ui-view flex=\"100\"></div>\n" +
    "	</md-content>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/layouts/main-page/main-page.html',
    "<md-toolbar ng-show=\"!showSearch\">\n" +
    "	<div class=\"md-toolbar-tools\">\n" +
    "		<md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "			<ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "		<h3>\n" +
    "			<a href=\"/\">mmwe</a>\n" +
    "		</h3>\n" +
    "		<span flex></span>\n" +
    "		<md-button aria-label=\"Search\" ng-click=\"showSearch = !showSearch\">\n" +
    "			<ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "		<md-menu>\n" +
    "			<md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "				<md-icon> more_vert</md-icon>\n" +
    "			</md-button>\n" +
    "			<md-menu-content width=\"4\">\n" +
    "				<md-menu-item>\n" +
    "					<md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "						<md-icon>face</md-icon>\n" +
    "						Profile\n" +
    "					</md-button>\n" +
    "				</md-menu-item>\n" +
    "				<md-menu-item>\n" +
    "					<md-button ng-click=\"layout.changePassword()\">\n" +
    "						<md-icon>lock</md-icon>\n" +
    "						Password\n" +
    "					</md-button>\n" +
    "				</md-menu-item>\n" +
    "				<md-menu-divider></md-menu-divider>\n" +
    "				<md-menu-item>\n" +
    "					<md-button ng-click=\"layout.logOut()\">\n" +
    "						<md-icon>power_settings_new</md-icon>\n" +
    "						Logout\n" +
    "					</md-button>\n" +
    "				</md-menu-item>\n" +
    "			</md-menu-content>\n" +
    "		</md-menu>\n" +
    "	</div>\n" +
    "</md-toolbar>\n" +
    "<md-toolbar class=\"md-hue-1\" ng-show=\"showSearch\">\n" +
    "	<div class=\"md-toolbar-tools\">\n" +
    "		<md-button ng-click=\"showSearch = !showSearch\" aria-label=\"Back\">\n" +
    "			<ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "		<h3 flex=\"10\">\n" +
    "			Back\n" +
    "		</h3>\n" +
    "		<md-input-container md-theme=\"input\" flex>\n" +
    "			<label>&nbsp;</label>\n" +
    "			<input ng-model=\"search.who\" placeholder=\"Search ...\">\n" +
    "		</md-input-container>\n" +
    "\n" +
    "	</div>\n" +
    "</md-toolbar>\n" +
    "<md-content class=\"md-blue-grey-theme\" flex md-scroll-y>\n" +
    "	<ui-view layout=\"column\" layout-fill layout-padding>\n" +
    "\n" +
    "	</ui-view>\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/layouts/side-nav/sidenav.html',
    "<md-toolbar class=\"md-tall md-hue-2\">\n" +
    "	<div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "		<div layout=\"row\">\n" +
    "			<div flex=\"20\">\n" +
    "\n" +
    "			</div>\n" +
    "			<div flex=\"80\" style=\"margin-top: 10px;font-size: 1em;\">\n" +
    "				<div>Fernando Monteiro</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</md-toolbar>\n" +
    "<md-list>\n" +
    "	<md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo(item.link)\">\n" +
    "		<div class=\"inset\" ng-show=\"item.icon\">\n" +
    "			<ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "		</div>\n" +
    "		<p> {{ item.name }}</p>\n" +
    "	</md-list-item>\n" +
    "	<md-divider></md-divider>\n" +
    "	<md-subheader>Admin</md-subheader>\n" +
    "	<md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\">\n" +
    "		<div class=\"inset\">\n" +
    "			<ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "		</div>\n" +
    "		<p> {{ item.title }}</p>\n" +
    "	</md-list-item>\n" +
    "</md-list>\n"
  );


  $templateCache.put('app/modules/metaModels/metaModels.html',
    "<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "    <div ng-controller=\"SidenavCtrl as vm\" ng-cloak>\n" +
    "        <md-toolbar class=\"md-tall md-hue-2\">\n" +
    "            <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"80\" style=\"margin-top: 10px;\">\n" +
    "                        <div>mmwe</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-list>\n" +
    "            <md-list-item ui-sref=\"home.dashboard\">\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"apps\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> Dashboard </p>\n" +
    "            </md-list-item>\n" +
    "            <md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo('home.' + item.link)\">\n" +
    "                <div class=\"inset\" ng-show=\"item.icon\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p > {{ item.name }}</p>\n" +
    "            </md-list-item>\n" +
    "            <md-divider></md-divider>\n" +
    "            <md-subheader>Admin</md-subheader>\n" +
    "            <md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\" >\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.title }}</p>\n" +
    "            </md-list-item>\n" +
    "        </md-list>\n" +
    "    </div>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
    "    <md-toolbar ng-show=\"!showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "                <ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3>mmwe</h3>\n" +
    "            <span flex></span>\n" +
    "            <md-button aria-label=\"Search\" ng-click=\"showSearch = !showSearch\">\n" +
    "                <ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <md-menu>\n" +
    "                <md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "                    <md-icon> more_vert </md-icon>\n" +
    "                </md-button>\n" +
    "                <md-menu-content width=\"4\">\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "                            <md-icon>face</md-icon>\n" +
    "                            Profile\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changePassword()\">\n" +
    "                            <md-icon>lock</md-icon>\n" +
    "                            Password\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-divider></md-menu-divider>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.logOut()\">\n" +
    "                            <md-icon>power_settings_new</md-icon>\n" +
    "                            Logout\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                </md-menu-content>\n" +
    "            </md-menu>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-toolbar class=\"md-hue-1\" ng-show=\"showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"showSearch = !showSearch\" aria-label=\"Back\">\n" +
    "                <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3 flex=\"10\">\n" +
    "                Back\n" +
    "            </h3>\n" +
    "            <md-input-container md-theme=\"input\" flex>\n" +
    "                <label>&nbsp;</label>\n" +
    "                <input ng-model=\"search.who\" placeholder=\"Search ...\">\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-content layout=\"column\" flex md-scroll-y style=\"background-color:#DCDCDC\">\n" +
    "        <div ui-view></div>\n" +
    "    </md-content>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/metaModels/metaModelsEditor.html',
    "<!-- as a Dom element -->\n" +
    "<!-- as an attribute -->\n" +
    "\n" +
    "<div class=\"md-padding\" flex layout=\"row\">\n" +
    "\n" +
    "	<md-card flex=\"50\">\n" +
    "\n" +
    "		<tree-ecore-editor tree-ecore-element=\"ctrl.SamplePackage\"\n" +
    "						   selected-element=\"ctrl.selectedElement\">\n" +
    "		</tree-ecore-editor>\n" +
    "\n" +
    "	</md-card>\n" +
    "\n" +
    "\n" +
    "	<md-card layout=\"column\" flex=\"50\">\n" +
    "		<md-toolbar>\n" +
    "			<div class=\"md-toolbar-tools\">\n" +
    "				<ng-md-icon icon=\"tab\"></ng-md-icon>\n" +
    "				&nbsp;\n" +
    "				<h2>\n" +
    "					<span>Panels</span>\n" +
    "				</h2>\n" +
    "				<span flex></span>\n" +
    "			</div>\n" +
    "		</md-toolbar>\n" +
    "		<md-tabs md-dynamic-height md-border-bottom>\n" +
    "			<md-tab label=\"Properties\">\n" +
    "				<tree-ecore-properties-editor ng-if=\"ctrl.selectedElement\"\n" +
    "											  tree-ecore-element=\"ctrl.selectedElement\">\n" +
    "\n" +
    "				</tree-ecore-properties-editor>\n" +
    "\n" +
    "			</md-tab>\n" +
    "			<md-tab label=\"Progress\">\n" +
    "\n" +
    "			</md-tab>\n" +
    "			<md-tab label=\"Console\">\n" +
    "\n" +
    "			</md-tab>\n" +
    "\n" +
    "		</md-tabs>\n" +
    "\n" +
    "\n" +
    "	</md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/metaModels/treeEcoreEditor.html',
    "<style>\n" +
    "	.a1 {\n" +
    "		margin-bottom: 0.5em;\n" +
    "		margin-top: 0.5em;\n" +
    "	}\n" +
    "\n" +
    "	.a2 {\n" +
    "		margin-bottom: 0.5em;\n" +
    "		margin-top: 0.5em;\n" +
    "	}\n" +
    "</style>\n" +
    "<md-toolbar>\n" +
    "	<div class=\"md-toolbar-tools\">\n" +
    "		<ng-md-icon icon=\"format_indent_increase\"></ng-md-icon>\n" +
    "		&nbsp;\n" +
    "		<h2>\n" +
    "			<span>Tree Editor</span>\n" +
    "		</h2>\n" +
    "		<span flex></span>\n" +
    "		<md-button class=\"md-fab md-mini\" ng-if=\"ctrl.selectedElement.children && !ctrl.creatingElement \"\n" +
    "				   ng-click=\"ctrl.addChild()\">\n" +
    "			<ng-md-icon icon=\"add_circle_outline\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "		<md-button class=\"md-fab md-mini\" ng-if=\"ctrl.selectedElement._parent && !ctrl.creatingElement\"\n" +
    "				   ng-click=\"ctrl.removeChild()\">\n" +
    "			<ng-md-icon icon=\"remove_circle_outline\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "	</div>\n" +
    "</md-toolbar>\n" +
    "\n" +
    "<md-toolbar ng-if=\"ctrl.creatingElement\">\n" +
    "	<div class=\"md-toolbar-tools\" layout-align=\"center center\" layout-wrap>\n" +
    "\n" +
    "		<md-button class=\"md-fab md-mini\"\n" +
    "				   ng-click=\"ctrl.doCreateChild()\">\n" +
    "			<ng-md-icon icon=\"archive\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "		<md-button class=\"md-fab md-mini\"\n" +
    "				   ng-click=\"ctrl.doCreateChild()\">\n" +
    "			<ng-md-icon icon=\"class\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "		<md-button class=\"md-fab md-mini\"\n" +
    "				   ng-click=\"ctrl.doCreateChild()\">\n" +
    "			<ng-md-icon icon=\"list\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "		<md-button class=\"md-fab md-mini\"\n" +
    "				   ng-click=\"ctrl.doCreateChild()\">\n" +
    "			<ng-md-icon icon=\"swap_horiz\"></ng-md-icon>\n" +
    "		</md-button>\n" +
    "\n" +
    "	</div>\n" +
    "</md-toolbar>\n" +
    "<md-content class=\"md-padding\" layout-xs=\"column\" layout=\"row\">\n" +
    "\n" +
    "	<treecontrol class=\"tree-light\"\n" +
    "				 tree-model=\"ctrl.dataForTheTree\"\n" +
    "				 options=\"ctrl.treeOptions\"\n" +
    "				 selected-node=\"node1\"\n" +
    "				 on-selection=\"ctrl.onElementSelected(node)\">\n" +
    "			<span>\n" +
    "				<ng-md-icon icon=\"{{node._icon}}\"></ng-md-icon>\n" +
    "			 </span>\n" +
    "		{{node.values.name}}\n" +
    "\n" +
    "	</treecontrol>\n" +
    "</md-content>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('app/modules/metaModels/treeEcorePropertiesEditor.html',
    "<md-table-container>\n" +
    "	<table md-table>\n" +
    "		<thead md-head>\n" +
    "		<tr md-row>\n" +
    "			<th md-column md-numeric>Property</th>\n" +
    "			<th md-column md-numeric>Value</th>\n" +
    "		</tr>\n" +
    "		</thead>\n" +
    "		<tbody md-body>\n" +
    "		<tr md-row\n" +
    "			ng-repeat=\"(property, value) in ctrl.treeEcoreElement.values\"\n" +
    "			ng-if=\"ctrl.isSupported(property,value)\">\n" +
    "			<td md-cell>{{property}}</td>\n" +
    "			<td md-cell>\n" +
    "				<input flex ng-model=\"ctrl.treeEcoreElement.values[property]\">\n" +
    "			</td>\n" +
    "		</tr>\n" +
    "		</tbody>\n" +
    "	</table>\n" +
    "</md-table-container>\n"
  );

}]);
