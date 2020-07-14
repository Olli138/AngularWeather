//Model for fetched Weather Data
export class WeatherModel {
    city: string;
    country: string;
    weatherList: Object[];

    constructor(city: string, country: string, weatherList: []) {
        this.city = city;
        this.country = country;
        this.weatherList = [];
    }
}