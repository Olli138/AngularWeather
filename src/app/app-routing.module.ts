import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { WeatherComponent } from './weather/weather.component';
import { SimpleWeatherComponent } from './weather/simple-weather/simple-weather.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'error', component: ErrorComponent },
  {
    path: 'weather', component: WeatherComponent, children: [
      { path: ':search', component: SimpleWeatherComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
