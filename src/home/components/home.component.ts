import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgSelectOption} from 'angular2/common';

import {NameListService} from '../../shared/services/name-list.service';
import {RunnerListService} from '../../shared/services/runner-list.service';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,NgSelectOption]
})

export class HomeComponent {
  newName: string;
  selected_country = '';
  runners = [];
  countries = [];
  constructor(public nameListService: NameListService,public runnerListService: RunnerListService) {
    this.runnerListService.fetchCountries(true);
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    this.newName = '';
    return false;
  }

  fetchRunners(): void {
    this.runnerListService.fetchRunners(this.selected_country);
  }
}
