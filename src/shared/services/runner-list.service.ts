import {Injectable} from 'angular2/core';
import {Http,Response} from 'angular2/http';

interface RunnerInfo {
  name: string;
  city: string;
  profileImg: string;
  uuid: string;
  runnerProfile: string;
}

@Injectable()
export class RunnerListService {

  countries= [];
  runners = {};
  load_countries_complete = false;
  load_runners_complete = true;
  response: any;

  constructor(public http: Http) {}

  fetchCountries(force=false): void {
    if(force) {
      console.log('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/');
      this.load_countries_complete = false;
      this._callApi('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/')
        .map((response: Response) => response.json())
        .subscribe(
          response => {
            this.countries = response;
            this.load_countries_complete = true;
          },
          error => this.response = error.text()
        );
    }
  }

  getCountries(): string[] {
    //console.log(this.countries);
    return this.countries;
  }

  isGettingCountriesComplete(): boolean {
    return this.load_countries_complete;
  }

  isGettingRunnersComplete(): boolean {
    return this.load_runners_complete;
  }

  fetchRunners(country: string,force= false): void {
    if(country.length === 0)
      return;
    if(force||typeof this.runners[country] === 'undefined') {
      console.log('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/' + country);
      this.load_runners_complete = false;
      this._callApi('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/' + country)
        .map((response: Response) => response.json())
        .subscribe(
          response => {
            this.runners[country] = response;
            this.load_runners_complete = true;
          },
          error => this.response = error.text()
        );
    }
    //console.log(this.runners);
    //console.log(this.runners[country]);
  }

  getRunners(country,keyword): RunnerInfo[] {
    keyword = keyword.toLowerCase();
    var set_runners = this.runners[country]||[];
    if(keyword.length === 0) {
      return set_runners;
    } else {
      return set_runners.map((runner) => {
        if(runner.name.toLowerCase().indexOf(keyword) !== -1
          || runner.city.toLowerCase().indexOf(keyword) !== -1)
          return runner;
      }).filter(x=>!!x);
    }
  }

  _callApi(url) {
    return this.http.get(url);
  }
}
