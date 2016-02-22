import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {HomeComponent} from '../../home/components/home.component';
import {NameListService} from '../../shared/services/name-list.service';
import {RunnerListService} from '../../shared/services/runner-list.service';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService,RunnerListService],
  moduleId: module.id,
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
@RouteConfig([
  { path: '/',      name: 'Home',  component: HomeComponent  },
])
export class AppComponent {}
