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

export class RunnerListService {

  response: string;

  fetchCountries(http): void {
    this._callApi(http,'http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/');
  }

  getCountries(): string {
    return this.response;
  }

  _callApi(http,url) {
    this.response = null;
    http.get(url)
      .subscribe(
        response => this.response = response.text(),
        error => this.response = error.text()
      );
  }

}
