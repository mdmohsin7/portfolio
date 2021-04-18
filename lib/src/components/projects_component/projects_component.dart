import 'package:angular/angular.dart';
import 'package:angular_components/material_button/material_button.dart';
import 'package:angular_components/material_icon/material_icon.dart';

@Component(
  selector: 'projects',
  templateUrl: 'projects_component.html',
  styleUrls: [
    'package:angular_components/css/mdc_web/card/mdc-card.scss.css',
    'projects_component.css'
  ],
  directives: [coreDirectives,MaterialButtonComponent,
    MaterialIconComponent,],
  providers: [],
)
class ProjectsComponent {}
