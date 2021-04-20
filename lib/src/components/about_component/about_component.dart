import 'package:angular/angular.dart';

@Component(
  selector: 'about',
  templateUrl: 'about_component.html',
  styleUrls: ['about_component.css'],
  directives: [coreDirectives],
  providers: [],
)
class AboutComponent {
  String image = 'packages/portfolio/lib/assets/profile.png';
}
