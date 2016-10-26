angular.module('mmwe').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/home/dashboard.html',
    "<div class=\"md-padding\" flex layout-sm=\"column\">\n" +
    "	<md-card>\n" +
    "		<md-card-content class=\"text-center\">\n" +
    "			<h1 class=\"title\">{{ vm.title }}</h1>\n" +
    "\n" +
    "			<h3>{{ vm.subtitle }}</h3>\n" +
    "		</md-card-content>\n" +
    "		<md-card-content>\n" +
    "			<p>\n" +
    "				<strong>MMWE</strong> a.k.a. <strong>Meta Model Web Editor</strong>\n" +
    "				allows you to create, modify and use Ecore (EMOF) based\n" +
    "				Meta/Final Models defined and stored in DISIM's repository.\n" +
    "			</p>\n" +
    "\n" +
    "			<p>\n" +
    "				The project is developed in collaboration with the <strong>Department of Computer Science and Software\n" +
    "				Engineering</strong> (DISIM in Italian)\n" +
    "				of the <strong>University of L'Aquila</strong>.\n" +
    "			</p>\n" +
    "\n" +
    "			<br>\n" +
    "\n" +
    "			<p><a href=\"https://github.com/nicfix/ecore-mmwe\" class=\"btn btn-primary\" role=\"button\">Learn\n" +
    "				more »</a></p>\n" +
    "			<md-divider class=\"margin-top-20\"></md-divider>\n" +
    "			<h2 class=\"margin-top-50\">Features</h2>\n" +
    "			<ul>\n" +
    "				<li class=\"\" ng-repeat=\"item in vm.listFeatures\">\n" +
    "					<p>\n" +
    "						<ng-md-icon icon=\"check\" ng-if=\"item.status=='DONE'\"></ng-md-icon>\n" +
    "						<ng-md-icon icon=\"create\" ng-if=\"item.status=='IN_PROGRESS'\"></ng-md-icon>\n" +
    "						{{item.feature}}\n" +
    "					</p>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</md-card-content>\n" +
    "	</md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\"\n" +
    "			md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "	<div ng-include=\"'/app/modules/layouts/side-nav/sidenav.html'\" flex></div>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
    "	<md-toolbar ng-show=\"!showSearch\">\n" +
    "		<div ng-include=\"'/app/modules/layouts/tool-bar/toolbar.html'\"></div>\n" +
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
    "<div ng-controller=\"SidenavCtrl as vm\" ng-cloak layout=\"column\" layout-fill>\n" +
    "	<md-toolbar class=\"md-tall md-hue-2\">\n" +
    "		<div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "			<div layout=\"row\">\n" +
    "				<div flex=\"80\" style=\"margin-top: 10px;\">\n" +
    "					<div class=\"title\">{{vm.title}}</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</md-toolbar>\n" +
    "	<md-list flex>\n" +
    "		<md-list-item ui-sref=\"home.dashboard\">\n" +
    "			<div class=\"inset\">\n" +
    "				<ng-md-icon icon=\"apps\"></ng-md-icon>\n" +
    "			</div>\n" +
    "			<p> Dashboard </p>\n" +
    "		</md-list-item>\n" +
    "		<md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo('home.' + item.link)\">\n" +
    "			<div class=\"inset\" ng-show=\"item.icon\">\n" +
    "				<ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "			</div>\n" +
    "			<p> {{ item.name }}</p>\n" +
    "		</md-list-item>\n" +
    "\n" +
    "		<!--md-subheader>Admin</md-subheader>\n" +
    "		<md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\">\n" +
    "			<div class=\"inset\">\n" +
    "				<ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "			</div>\n" +
    "			<p> {{ item.title }}</p>\n" +
    "		</md-list-item-->\n" +
    "	</md-list>\n" +
    "	<span flex></span>\n" +
    "	<md-divider></md-divider>\n" +
    "	<div style=\"padding-left:10px; padding-right: 10px;\">\n" +
    "		<img style=\"width:100%\" src=\"/app/assets/images/pageres.png\">\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/layouts/tool-bar/toolbar.html',
    "<div class=\"md-toolbar-tools\">\n" +
    "	<md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "		<ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "	</md-button>\n" +
    "	<h3 class=\"title\">{{layout.title}}</h3>\n" +
    "	<span flex></span>\n" +
    "	<md-button aria-label=\"Search\" ng-click=\"showSearch = !showSearch\">\n" +
    "		<ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "	</md-button>\n" +
    "	<md-menu>\n" +
    "		<md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "			<md-icon> more_vert</md-icon>\n" +
    "		</md-button>\n" +
    "		<md-menu-content width=\"4\">\n" +
    "			<md-menu-item>\n" +
    "				<md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "					<md-icon>face</md-icon>\n" +
    "					Profile\n" +
    "				</md-button>\n" +
    "			</md-menu-item>\n" +
    "			<md-menu-item>\n" +
    "				<md-button ng-click=\"layout.changePassword()\">\n" +
    "					<md-icon>lock</md-icon>\n" +
    "					Password\n" +
    "				</md-button>\n" +
    "			</md-menu-item>\n" +
    "			<md-menu-divider></md-menu-divider>\n" +
    "			<md-menu-item>\n" +
    "				<md-button ng-click=\"layout.logOut()\">\n" +
    "					<md-icon>power_settings_new</md-icon>\n" +
    "					Logout\n" +
    "				</md-button>\n" +
    "			</md-menu-item>\n" +
    "		</md-menu-content>\n" +
    "	</md-menu>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/metaModels/metaModels.html',
    "<!--md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
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
    "</md-sidenav-->\n" +
    "\n" +
    "<!--div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
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
    "\n" +
    "</div-->\n" +
    "\n" +
    "\n" +
    "<md-content layout=\"column\" flex md-scroll-y style=\"background-color:#DCDCDC\">\n" +
    "	<div ui-view flex=\"100\"></div>\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/metaModelsBrowser/metaModelsList.html',
    "<!-- as a Dom element -->\n" +
    "<!-- as an attribute -->\n" +
    "\n" +
    "<div class=\"md-padding\" flex layout=\"row\" layout-fill>\n" +
    "\n" +
    "	<md-card layout=\"column\" flex>\n" +
    "		<md-toolbar>\n" +
    "			<div class=\"md-toolbar-tools\">\n" +
    "				<ng-md-icon icon=\"folder\"></ng-md-icon>\n" +
    "				&nbsp;\n" +
    "				<h2>\n" +
    "					<span>Available Meta Models</span>\n" +
    "				</h2>\n" +
    "				<span flex></span>\n" +
    "			</div>\n" +
    "		</md-toolbar>\n" +
    "\n" +
    "		<div flex ng-if=\"ctrl.loading\">\n" +
    "			<md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "			<md-subheader class=\"md-no-sticky\">Downloading Meta Models</md-subheader>\n" +
    "		</div>\n" +
    "		<md-list flex ng-if=\"!ctrl.loading && ctrl.items.length>0\">\n" +
    "\n" +
    "			<md-list-item class=\"md-3-line\" ng-repeat=\"item in ctrl.items\" ng-click=\"ctrl.editMetamodel(item)\">\n" +
    "				<ng-md-icon icon=\"insert_drive_file\" class=\"md-avatar\"></ng-md-icon>\n" +
    "				<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "					<h3>{{ item.name }}</h3>\n" +
    "					<h4>{{ item.url }}</h4>\n" +
    "\n" +
    "					<p>{{ item.description }}</p>\n" +
    "				</div>\n" +
    "			</md-list-item>\n" +
    "		</md-list>\n" +
    "		<md-list flex ng-if=\"!ctrl.loading && ctrl.items.length==0\">\n" +
    "			<md-subheader class=\"md-no-sticky\">Sorry, no Meta Models for the selected query :(</md-subheader>\n" +
    "		</md-list>\n" +
    "	</md-card>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('app/modules/metaModelsEditor/consolePanel.html',
    "<md-content flex layout-fill>\n" +
    "	<md-table-container layout-fill>\n" +
    "		<table md-table>\n" +
    "			<thead md-head>\n" +
    "			<tr md-row>\n" +
    "				<th md-column md-numeric>Time</th>\n" +
    "				<th md-column md-numeric>Source</th>\n" +
    "				<th md-column md-numeric>Message</th>\n" +
    "			</tr>\n" +
    "			</thead>\n" +
    "			<tbody md-body>\n" +
    "			<tr md-row\n" +
    "				ng-repeat=\"log in ctrl.logs | orderBy :'-date'\">\n" +
    "\n" +
    "				<td md-cell>{{log.date|date:'HH:mm:ss'}}</td>\n" +
    "				<td md-cell>{{log.source}}</td>\n" +
    "				<td md-cell>{{log.message}}</td>\n" +
    "			</tr>\n" +
    "			</tbody>\n" +
    "		</table>\n" +
    "	</md-table-container>\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/metaModelsEditor/metaModelsEditor.html',
    "<!-- as a Dom element -->\n" +
    "<!-- as an attribute -->\n" +
    "\n" +
    "<div class=\"md-padding\" flex layout=\"row\" layout-fill ng-if=\"ctrl.editingPackage\">\n" +
    "\n" +
    "\n" +
    "	<tree-ecore-editor flex=\"50\" layout=\"column\" tree-ecore-element=\"ctrl.editingPackage\"\n" +
    "					   selected-element=\"ctrl.selectedElement\"\n" +
    "					   ng-if=\"ctrl.settings.editor.mode.value==ctrl.EDITOR_MODE_AS_TREE.value\">\n" +
    "	</tree-ecore-editor>\n" +
    "\n" +
    "\n" +
    "	<md-card flex=\"50\" layout=\"column\" ng-if=\"ctrl.settings.panels.mode.value==ctrl.PANELS_MODE_AS_CARD.value\">\n" +
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
    "				<md-content layout=\"column\">\n" +
    "					<tree-ecore-properties-editor ng-if=\"ctrl.selectedElement\"\n" +
    "												  root-tree-ecore-element=\"ctrl.editingPackage\"\n" +
    "												  tree-ecore-element=\"ctrl.selectedElement\">\n" +
    "\n" +
    "					</tree-ecore-properties-editor>\n" +
    "				</md-content>\n" +
    "\n" +
    "\n" +
    "			</md-tab>\n" +
    "\n" +
    "			<md-tab label=\"Console\">\n" +
    "				<md-content layout=\"column\">\n" +
    "					<console-panel>\n" +
    "\n" +
    "					</console-panel>\n" +
    "				</md-content>\n" +
    "			</md-tab>\n" +
    "\n" +
    "			<md-tab label=\"Progress\">\n" +
    "				<md-content layout=\"column\">\n" +
    "					<md-list>\n" +
    "						<md-list-item>\n" +
    "							<h3>In development</h3>\n" +
    "						</md-list-item>\n" +
    "					</md-list>\n" +
    "\n" +
    "				</md-content>\n" +
    "			</md-tab>\n" +
    "\n" +
    "			<!--md-tab label=\"JSON\">\n" +
    "				<pre>\n" +
    "  					{{ctrl.selectedElement.values | json}}\n" +
    "				</pre>\n" +
    "			</md-tab-->\n" +
    "\n" +
    "		</md-tabs>\n" +
    "	</md-card>\n" +
    "\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('app/modules/metaModelsEditor/treeEcoreEditor.html',
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
    "\n" +
    "	.liSelected {\n" +
    "		border: none;\n" +
    "	}\n" +
    "</style>\n" +
    "<md-card layout=\"column\" ng-keydown=\"ctrl.down\">\n" +
    "	<md-toolbar>\n" +
    "		<div class=\"md-toolbar-tools\">\n" +
    "			<ng-md-icon icon=\"format_indent_increase\"></ng-md-icon>\n" +
    "			&nbsp;\n" +
    "			<h2>\n" +
    "				<span>Tree Editor</span>\n" +
    "			</h2>\n" +
    "			<span flex></span>\n" +
    "			<md-button class=\"md-fab md-mini\"\n" +
    "					   ng-if=\"ctrl.getSupportedChildrenTypes().length > 0 \"\n" +
    "					   ng-click=\"ctrl.addChild()\">\n" +
    "				<ng-md-icon icon=\"add_circle_outline\"></ng-md-icon>\n" +
    "			</md-button>\n" +
    "			<md-button class=\"md-fab md-mini\" ng-if=\"ctrl.selectedElement._parent\"\n" +
    "					   ng-click=\"ctrl.removeChild()\">\n" +
    "				<ng-md-icon icon=\"remove_circle_outline\"></ng-md-icon>\n" +
    "			</md-button>\n" +
    "		</div>\n" +
    "	</md-toolbar>\n" +
    "\n" +
    "	<md-content class=\"md-padding\" layout=\"column\">\n" +
    "\n" +
    "		<treecontrol class=\"tree-light\"\n" +
    "					 tree-model=\"ctrl.treeEcorePackage\"\n" +
    "					 options=\"ctrl.treeOptions\"\n" +
    "					 selected-node=\"ctrl.selectedElement\"\n" +
    "					 expanded-nodes=\"ctrl.expandedElements\">\n" +
    "			<span>\n" +
    "				<ng-md-icon icon=\"{{ctrl.ECORE_TYPE_ICONS[node._type]}}\"></ng-md-icon>\n" +
    "			 </span>\n" +
    "			{{node.values.name}}\n" +
    "			<span ng-switch=\"node._type\">\n" +
    "\n" +
    "				<span ng-if=\"node._type==ctrl.ECORE_TYPES.EClass\"\n" +
    "					  ng-repeat=\"superType in node.values.eSuperTypes\">\n" +
    "					&nbsp;<span ng-if=\"$index==0\">-></span> <span ng-if=\"$index!=0\">,</span> {{superType.values.name}}\n" +
    "				</span>\n" +
    "\n" +
    "				<span ng-if=\"node._type==ctrl.ECORE_TYPES.EAttribute || node._type==ctrl.ECORE_TYPES.EReference\">\n" +
    "					&nbsp;:&nbsp;{{node.values.eType.values.name}}\n" +
    "				</span>\n" +
    "\n" +
    "			</span>\n" +
    "		</treecontrol>\n" +
    "	</md-content>\n" +
    "</md-card>\n" +
    "\n" +
    "<!-- HIDDEN DIALOG FOR ADDING ELEMENTS -->\n" +
    "<div style=\"visibility: hidden\">\n" +
    "	<div class=\"md-dialog-container\" id=\"addChildrenDialog\">\n" +
    "		<md-dialog>\n" +
    "			<md-toolbar>\n" +
    "				<div class=\"md-toolbar-tools\">\n" +
    "					<ng-md-icon icon=\"add_circle_outline\"></ng-md-icon>\n" +
    "					&nbsp;\n" +
    "					<h2>\n" +
    "						<span>Add children</span>\n" +
    "					</h2>\n" +
    "					<span flex></span>\n" +
    "\n" +
    "				</div>\n" +
    "			</md-toolbar>\n" +
    "\n" +
    "			<md-content layout-padding>\n" +
    "\n" +
    "				<p>What do you want to add to {{ctrl.selectedElement._type}} named <strong>{{ctrl.selectedElement.values.name}}</strong>\n" +
    "					?</p>\n" +
    "\n" +
    "				<md-list>\n" +
    "					<md-list-item class=\"md-2-line\" ng-click=\"ctrl.doCreateChild(child_type)\"\n" +
    "								  ng-repeat=\"child_type in ctrl.getSupportedChildrenTypes()\">\n" +
    "						<ng-md-icon icon=\"{{ctrl.ECORE_TYPE_ICONS[child_type]}}\" class=\"md-avatar-icon\"></ng-md-icon>\n" +
    "\n" +
    "						<div class=\"md-list-item-text\" ng-class=\"{'md-offset': phone.options.offset }\">\n" +
    "							<h3> {{ child_type }} </h3>\n" +
    "\n" +
    "							<p> {{ phone.type }} </p>\n" +
    "						</div>\n" +
    "\n" +
    "						<ng-md-icon icon=\"keyboard_arrow_right\"></ng-md-icon>\n" +
    "\n" +
    "					</md-list-item>\n" +
    "\n" +
    "					<!--md-button class=\"md-fab md-mini\"\n" +
    "							   aria-label=\"{{child_type}}\"\n" +
    "							   ng-click=\"ctrl.doCreateChild(child_type)\"\n" +
    "							   ng-repeat=\"child_type in ctrl.getSupportedChildrenTypes()\">\n" +
    "						<ng-md-icon icon=\"{{ctrl.ECORE_TYPE_ICONS[child_type]}}\"></ng-md-icon>\n" +
    "					</md-button-->\n" +
    "\n" +
    "				</md-list>\n" +
    "		</md-dialog>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('app/modules/metaModelsEditor/treeEcorePropertiesEditor.html',
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
    "\n" +
    "			<td md-cell>{{property}}</td>\n" +
    "			<td md-cell>\n" +
    "				<input ng-if=\"!ctrl.hasOptions(property)\" flex type=\"{{ctrl.getFieldType(property)}}\"\n" +
    "					   ng-model=\"ctrl.treeEcoreElement.values[property]\">\n" +
    "\n" +
    "				<md-select ng-if=\"property=='eSuperTypes'\"\n" +
    "						   ng-model=\"ctrl.treeEcoreElement.values[property]\" multiple>\n" +
    "					<md-option ng-repeat=\"option in ctrl.listOptions(property)| filter: ctrl.notHimSelf\"\n" +
    "							   ng-value=\"option\">\n" +
    "						{{option.values.name}}\n" +
    "					</md-option>\n" +
    "				</md-select>\n" +
    "\n" +
    "				<md-select ng-if=\"ctrl.hasOptions(property) && !ctrl.isMultiple(property) && property!=='eSuperTypes'\"\n" +
    "						   ng-model=\"ctrl.treeEcoreElement.values[property]\">\n" +
    "					<md-option ng-repeat=\"option in ctrl.listOptions(property)\" ng-value=\"option.value\">\n" +
    "						{{option.label}}\n" +
    "					</md-option>\n" +
    "				</md-select>\n" +
    "			</td>\n" +
    "		</tr>\n" +
    "		</tbody>\n" +
    "	</table>\n" +
    "</md-table-container>\n"
  );

}]);
