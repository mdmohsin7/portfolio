export 'route_paths.dart';

import 'package:angular_router/angular_router.dart';
import 'package:portfolio/src/components/about_component/about_component.template.dart'
    as about_component;
import 'package:portfolio/src/components/skills_component/skills_component.template.dart'
    as skills_component;
import 'package:portfolio/src/components/projects_component/projects_component.template.dart'
    as projects_component;
import 'package:portfolio/src/components/contact_component/contact_component.template.dart'
    as contact_component;
import 'route_paths.dart';

class Routes {
  static final about = RouteDefinition(
    routePath: RoutePaths.about,
    component: about_component.AboutComponentNgFactory,
    useAsDefault: true,
  );
  static final skills = RouteDefinition(
    routePath: RoutePaths.skills,
    component: skills_component.SkillsComponentNgFactory,
  );
  static final projects = RouteDefinition(
    routePath: RoutePaths.projects,
    component: projects_component.ProjectsComponentNgFactory,
  );
  static final contact = RouteDefinition(
    routePath: RoutePaths.contact,
    component: contact_component.ContactComponentNgFactory,
  );

  static final all = <RouteDefinition>[
    about,
    skills,
    projects,
    contact,
  ];
}
