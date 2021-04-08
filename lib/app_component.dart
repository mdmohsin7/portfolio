import 'dart:html';

import 'package:angular/angular.dart';
import 'package:angular_components/angular_components.dart';
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_router/angular_router.dart';
import 'package:platform_info/platform_info.dart';

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
  bool showBrowser;

  @override
  void ngOnInit() {
    if (platform.isDesktop && !platform.isIOS) {
      if (platform.isMacOS) {
        if (window.navigator.maxTouchPoints > 1) {
          showBrowser = false;
        } else {
          showBrowser = true;
        }
      } else {
        showBrowser = true;
        print('desktop');
      }
    } else if (platform.isMobile) {
      if (window.orientation == 90) {
        showBrowser = true;
        print('oriented');
      } else {
        showBrowser = false;
        print('not oriented');
      }
    }
  }
}
