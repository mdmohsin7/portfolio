import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';
import 'package:portfolio/app_component.template.dart' as ng;
import 'main.template.dart' as self;

@GenerateInjector(
  routerProviders, // You can use routerProviders in production
)
final InjectorFactory injector = self.injector$Injector;
void main() {
  runApp(ng.AppComponentNgFactory, createInjector: injector);
}
