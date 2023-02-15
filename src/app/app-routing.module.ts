import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';
import { NonAuthGuard } from 'src/services/non-auth.guard';
import { AttractionsDashboardComponent } from './attractions-dashboard/attractions-dashboard.component';
import { CountriesComponent } from './countries/countries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MunicipalitiesComponent } from './municipalities/municipalities.component';
import { RegisterComponent } from './register/register.component';
import { SearchRateAttractionsComponent } from './search-rate-attractions/search-rate-attractions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard] },
  { path: '', component: SearchRateAttractionsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo:"countries", pathMatch: 'full'},
      {path: 'countries/:countryId/municipalities/:municipalityId/attractions', component: AttractionsDashboardComponent},
      {path: 'countries/:countryId/municipalities', component: MunicipalitiesComponent},
      {path: 'countries', component: CountriesComponent},
    ]
  },
  {path: "**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
