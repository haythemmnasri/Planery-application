import {Component, OnInit} from "@angular/core";
import {WeatherService} from "../services/weather/weather.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"]
})
export class WeatherComponent implements OnInit {
  temp: number;
  city = "Tunis";
  state: string;
  capitals = [];
  showNote = false;
  humidity: string;
  wind: number;
  icon: string;

  myControl = new FormControl();
  options: string[] = this.capitals;
  filteredOptions: Observable<string[]>;

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    this.getData();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.weatherService.getCountries().subscribe((countries: Array<any>) => {
      countries.forEach((country: any) => {
        if (country.capital.length) {
          this.capitals.push(country.capital);
        }
      });
    });

    this.weatherService.getCities().subscribe((cities: Array<any>) => {
      cities.forEach(city => {
        if (city.state.length) {
          this.capitals.push(city.state);
        }
      });
      this.capitals.sort();
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  selectCity(city) {
    if (this.capitals.includes(city)) {
      this.city = city;
      this.showNote = false;
      this.getData();
    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }

  getData() {
    this.weatherService.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
      this.humidity = payload.main.humidity;
      this.wind = Math.round(Math.round(payload.wind.speed));
      this.icon=payload.weather[0].icon;
    });
  }
}
