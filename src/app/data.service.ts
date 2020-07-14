import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WeatherModel } from './data.model';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'

@Injectable({ providedIn: 'root' })
export class DataService {
    public searchSubject = new Subject<any>();

    private searchInput: string;
    private weatherData: WeatherModel = new WeatherModel('', '', []);

    constructor(private http: HttpClient, private router: Router) { }


    setSearchInput(search: string) {
        this.searchInput = search;
        this.fetchData();
    }

    //Fetch Data from API
    fetchData() {
        this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.searchInput}&units=metric&appid=${environment.apiKey}`)
            .pipe(
                map((responseData: any) => {
                    this.weatherData.city = responseData.city.name;
                    this.weatherData.country = responseData.city.country;
                    let arr: Array<Object> = [];
                    responseData.list.forEach((element) => {
                        let obj =
                        {
                            date: element.dt_txt.substring(0, 10),
                            time: element.dt_txt.substring(11, 16),
                            temp_celcius: element.main.temp,
                            temp_celcius_max: element.main.temp_max,
                            temp_celcius_min: element.main.temp_min,
                            weatherIcon: element.weather[0].icon,
                            windSpeed: element.wind.speed,
                            humidity: element.main.humidity,
                        }
                        arr.push(obj);
                    })
                    this.weatherData.weatherList = arr;

                    return this.weatherData;
                }
                ))
            .subscribe((posts) => {
                this.searchSubject.next(posts);
            }, (error) => {
                this.router.navigate(['/error'])
            })
    }
}