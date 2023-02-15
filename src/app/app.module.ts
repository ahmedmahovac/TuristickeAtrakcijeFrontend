import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchRateAttractionsComponent } from './search-rate-attractions/search-rate-attractions.component';
import { AttractionsContainerComponent } from './attractions-container/attractions-container.component';
import { AttractionCardComponent } from './attraction-card/attraction-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { DashboardTabComponent } from './dashboard-tab/dashboard-tab.component';
import { CountriesComponent } from './countries/countries.component';
import { MunicipalitiesComponent } from './municipalities/municipalities.component';
import { AttractionsDashboardComponent } from './attractions-dashboard/attractions-dashboard.component';
import { CountryComponent } from './country/country.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { AttractionDashboardComponent } from './attraction-dashboard/attraction-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    SearchRateAttractionsComponent,
    AttractionsContainerComponent,
    AttractionCardComponent,
    DashboardComponent,
    DashboardTabComponent,
    CountriesComponent,
    MunicipalitiesComponent,
    AttractionsDashboardComponent,
    CountryComponent,
    MunicipalityComponent,
    AttractionDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
