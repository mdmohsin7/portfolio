import 'package:angular/angular.dart';
import 'package:angular_components/laminate/overlay/module.dart';
import 'package:angular_components/material_expansionpanel/material_expansionpanel.dart';

@Component(
  selector: 'skills',
  templateUrl: 'skills_component.html',
  styleUrls: ['skills_component.css'],
  directives: [coreDirectives,MaterialExpansionPanel],
  providers: [overlayBindings],
)
class SkillsComponent {
}