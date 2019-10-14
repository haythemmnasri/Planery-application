import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { FormsComponent } from './forms/forms.component';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [
  {path: 'weather-app', component: WeatherComponent},
  {path: 'forms', component: FormsComponent},
  {path: 'overview', component: OverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
