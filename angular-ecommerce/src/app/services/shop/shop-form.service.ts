import { Injectable } from '@angular/core';
import {Observable, of, retry} from "rxjs";
import {Country} from "../../modeles/country/country";
import {State} from "../../modeles/state/state";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl : string = 'http://localhost:8080/api/countries';
  private statessUrl : string = 'http://localhost:8080/api/states';

  constructor(private httpClient : HttpClient) { }

  getCreditCardMonths(startMonth : number) : Observable<number[]> {
    let data : number[] = [];

    // build an array for Month dropdown list
    // - start at current month and loop until
    for(let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears() : Observable<number[]> {
    let data : number[] = [];

    // build an array for Month dropdown list
    // - start at current month and loop for next 10 years
    const startYear : number = new Date().getFullYear();
    for (let currentYear = startYear; currentYear <= startYear+10; currentYear++) {
      data.push(currentYear);
    }

    return of(data);
  }

  getCountries() : Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStatesByCountryCode(code : string) : Observable<State[]> {
    const searchUrl = `${this.statessUrl}/search/findByCountryCode?code=${code}`;
    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(
      map(response => response._embedded.states)
    );
  }
}

interface GetResponseCountries {
  _embedded : {
    countries : Country[]
  }
}

interface GetResponseStates {
  _embedded : {
    states : State[]
  }
}
