import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attraction } from 'src/interfaces/Attraction';
import { Municipality } from 'src/interfaces/Municipality';
import { CountryMunicipalityService } from 'src/services/country-municipality.service';

@Component({
  selector: 'app-attraction-dashboard',
  templateUrl: './attraction-dashboard.component.html',
  styleUrls: ['./attraction-dashboard.component.css']
})
export class AttractionDashboardComponent {
  constructor(private countryMunicipalityService: CountryMunicipalityService){

  }

  @Input()
  attraction: Attraction = {id: -1, name: "", description: "", lat: 0, lon: 0, ratingAvg: 0, municipalityName: "", countryName: "", images: [], active: false};

  @Output()
  attractionDeletedEvent = new EventEmitter<Number>();
  @Output()
  attractionUpdateEvent = new EventEmitter<Attraction>();
  @Output()
  attractionActiveChangeEvent = new EventEmitter<Boolean>();

  handleDeleteAttraction(){
    console.log("deleting attraction");
    this.countryMunicipalityService.deleteAttraction(this.attraction.id+"").then(response=>{
      // emit output to remove deleted attraction from view
      this.attractionDeletedEvent.emit(this.attraction.id); 
    }).catch(err=>{
      console.log(err);
    });
  }


  handleActivateSwitchChange(event: any){
    let newValue = event.currentTarget.checked;
    this.countryMunicipalityService.setActiveAttraction(this.attraction, newValue).then(response=>{
      console.log(response);
      this.attraction.active = newValue;
      this.attractionActiveChangeEvent.emit(newValue);
    }).catch(err=>{
      console.log(err);
    });
  }


  handleUpdateAttraction(){
    // fill form with attraction data
    this.attractionUpdateEvent.emit(this.attraction);
  }


}
