import 'dart:html';

import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_router/angular_router.dart';

import 'router/routes.dart';
import 'src/components/app/body/app_body_component.dart';

@Component(
  selector: 'my-app',
  styleUrls: ['app_component.css'],
  templateUrl: 'app_component.html',
  directives: [
    MaterialIconComponent,
    routerDirectives,
    coreDirectives,
    AppBodyComponent,
  ],
  exports: [RoutePaths, Routes],
)
class AppComponent implements OnInit {
  bool showBrowser = true;
  @override
  void ngOnInit() {
    if (window.innerHeight > window.innerWidth) {
      showBrowser = false;
    } else {
      showBrowser = true;
    }
  }
}
