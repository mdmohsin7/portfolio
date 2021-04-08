import 'package:angular/angular.dart';
import 'package:angular_components/app_layout/material_temporary_drawer.dart';
import 'package:angular_components/content/deferred_content.dart';
import 'package:angular_components/material_button/material_button.dart';
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_components/material_list/material_list.dart';
import 'package:angular_components/material_list/material_list_item.dart';
import 'package:angular_router/angular_router.dart';
import 'package:portfolio/router/routes.dart';

@Component(
    selector: 'app-body',
    templateUrl: 'app_body_component.html',
    styleUrls: [
      'package:angular_components/app_layout/layout.scss.css',
      'app_body_component.css'
    ],
    directives: [
      coreDirectives,
      DeferredContentDirective,
      MaterialButtonComponent,
      MaterialIconComponent,
      MaterialTemporaryDrawerComponent,
      MaterialListComponent,
      MaterialListItemComponent,
      routerDirectives
    ],
    providers: [],
    exports: [
      RoutePaths,
      Routes
    ])
class AppBodyComponent {}
