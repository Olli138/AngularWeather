import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { WeatherModel } from '../data.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  data: WeatherModel;

  constructor(private http: HttpClient, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.subscription = this.weatherService.formattedDataChanged.subscribe(
      (formattedData) => {
        this.data = formattedData;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
