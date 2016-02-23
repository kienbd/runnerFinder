import {Injectable} from 'angular2/core';
import {Http,Response} from 'angular2/http';

interface RunnerInfo {
  name: string;
  city: string;
  profileImg: string;
  uuid: string;
  runnerProfile: string;
}

interface CountryInfo {
  name: string;
}

class Runner {
  constructor(public name,public city, public profileImg,public uuid,public runnerProfile) {}
}

class Country {
  runners =[];
  constructor(public name) {}

  addRunner(runner: Runner) {
    this.runners.concat(runner);
  }

  getRunners(): RunnerInfo[] {
    return this.runners;
  }
}

@Injectable()
export class RunnerListService {

  countries= [];
  runners = {};
  response: any;

  constructor(public http: Http) {}

  fetchCountries(): string[] {
    if(this.countries.length === 0) {
      console.log('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/');
      this._callApi('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/')
        .map((response: Response) => response.json())
        .subscribe(
          response => this.countries = response,
          error => this.response = error.text()
        );
    }
    return this.countries;
  }

  fetchRunners(country: string): Object[] {
    if(typeof this.runners[country] === 'undefined') {
      console.log('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/' + country);
      this._callApi('http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/' + country)
        .map((response: Response) => response.json())
        .subscribe(
          response => this.runners[country] = response,
          error => this.response = error.text()
        );
    }
    console.log(this.runners);
    console.log(this.runners[country]);
    return this.runners[country];
  }

  _callApi(url) {
    return this.http.get(url);
  }
}
