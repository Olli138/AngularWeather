import { Injectable } from "@angular/core";
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { WeatherModel } from '../data.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
    public formattedDataChanged = new Subject<WeatherModel>();
    public dates: string[] = [];
    public formattedData: any;

    constructor(private dataService: DataService) {
        this.dataService.searchSubject.subscribe((data) => {
            this.formattedData = data;

            //Removing last date so that we have full weather data for shown dates
            for (let wArr of this.formattedData.weatherList) {
                if (!this.dates.includes(wArr.date)) {
                    this.dates.push(wArr.date);
                }
            }
            this.dates.pop();
            this.formattedData.dates = this.dates;
            this.formattedDataChanged.next(this.formattedData);
        });
    }
}