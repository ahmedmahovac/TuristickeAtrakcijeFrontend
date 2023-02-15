import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/interfaces/Country';
import { CountryMunicipalityService } from 'src/services/country-municipality.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {

  constructor(private countryMunicipalityService: CountryMunicipalityService, private router: Router, private route: ActivatedRoute){

  }

  @Input()
  country: Country = {id: -1, name: ""};

  @Output()
  countryDeletedEvent = new EventEmitter<Number>();

  handleDeleteCountry(){
    console.log("deleting country");
    this.countryMunicipalityService.deleteCountry(this.country.id).then(response=>{
      // emit output to remove deleted country from view
      this.countryDeletedEvent.emit(this.country.id); 
    }).catch(err=>{
      console.log(err);
    });
  }


  handleOpenCountry(){
    this.router.navigate([this.country.id + "/municipalities"], {relativeTo: this.route});
  }

}
