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
  response: any;

  constructor(public http: Http) {}

  fetchCountries(force=false): void {
    if(force) {
      console.log('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/');
      this._callApi('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/')
        .map((response: Response) => response.json())
        .subscribe(
          response => this.countries = response,
          error => this.response = error.text()
        );
    }
  }

  getCountries(): string[] {
    return this.countries;
  }

  fetchRunners(country: string,force= false): void {
    if(country.length === 0)
      return;
    if(force||typeof this.runners[country] === 'undefined') {
      console.log('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/' + country);
      this._callApi('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/' + country)
        .map((response: Response) => response.json())
        .subscribe(
          response => this.runners[country] = response,
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
