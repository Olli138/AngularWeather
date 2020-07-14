import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-simple-weather',
  templateUrl: './simple-weather.component.html',
  styleUrls: ['./simple-weather.component.scss']
})
export class SimpleWeatherComponent implements OnInit {
  @Input() allData: any;
  public i = 0;
  public activeHeaderBtn: string = 'today';
  public search: string;

  constructor(private dataService: DataService, private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.formattedDataChanged.subscribe(
      (formData) => {
        this.allData = formData;
      }
    );

    //Setting Search Input if user access component by Url
    this.dataService.setSearchInput(this.route.snapshot.params['search']);
  }

  onToday() {
    this.activeHeaderBtn = 'today';
    this.setIndex();
  }

  onTomorrow() {
    this.activeHeaderBtn = 'tomorrow';
    this.setIndex();
  }

  onForecast() {
    this.activeHeaderBtn = 'forecast';
    this.setIndex();
  }

  setIndex() {
    switch (this.activeHeaderBtn) {
      case 'today':
        this.i = 0;
        break;
      case 'tomorrow':
        this.i = 1;
        break;
      case 'forecast':
        this.i = 2;
    }
  }
}

