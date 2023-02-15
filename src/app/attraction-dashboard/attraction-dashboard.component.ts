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
  attraction: Attraction = {id: -1, name: "", description: "", lat: 0, lon: 0, ratingAvg: 0, municipalityName: "", countryName: "", images: []};

  @Output()
  attractionDeletedEvent = new EventEmitter<Number>();

  handleDeleteAttraction(){
    console.log("deleting attraction");
    this.countryMunicipalityService.deleteAttraction(this.attraction.id+"").then(response=>{
      // emit output to remove deleted attraction from view
      this.attractionDeletedEvent.emit(this.attraction.id); 
    }).catch(err=>{
      console.log(err);
    });
  }

}
