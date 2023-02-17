import { Component } from '@angular/core';
import { AttractionsDashboardComponent } from '../attractions-dashboard/attractions-dashboard.component';
import { CountriesComponent } from '../countries/countries.component';
import { MunicipalitiesComponent } from '../municipalities/municipalities.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedTab: Number = 0;

  handleSelectedTabChange(component: any){
    let newSelectedTab = -1;
    if(component instanceof CountriesComponent){
      newSelectedTab=0;
    }
    else if(component instanceof MunicipalitiesComponent){
      newSelectedTab=1;
    }
    else if(component instanceof AttractionsDashboardComponent){
      newSelectedTab=2;
    }
    setTimeout(()=>{
      this.selectedTab=newSelectedTab;
    }, 0);
  }
}
