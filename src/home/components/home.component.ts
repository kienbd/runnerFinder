import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgSelectOption} from 'angular2/common';
import {PaginatePipe, PAGINATION_DIRECTIVES, IPaginationInstance,PaginationService} from 'ng2-pagination';


import {RunnerListService} from '../../shared/services/runner-list.service';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,NgSelectOption,PAGINATION_DIRECTIVES],
  pipes: [PaginatePipe],
  providers: [PaginationService]
})

export class HomeComponent {
  newName: string;
  selected_country = '';
  keyword = '';

  public config:IPaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
    step: 10
  };

  constructor(public runnerListService: RunnerListService) {
    this.runnerListService.fetchCountries(true);
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  fetchCountries(): void {
    this.runnerListService.fetchCountries(true);
  }

  fetchRunners(): void {
    this.runnerListService.fetchRunners(this.selected_country,true);
  }

  onChangeCountry(newValue): void {
    //console.log(newValue);
    this.selected_country = newValue;
    this.runnerListService.fetchRunners(newValue);
  }
  onScroll(event) {
    if (event.target.body.scrollTop + window.innerHeight > event.target.body.scrollHeight - 100) {
      console.log('next page');
      this.config.itemsPerPage += this.config.step;
    }
  }
}
