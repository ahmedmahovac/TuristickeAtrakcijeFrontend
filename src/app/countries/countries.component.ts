import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/interfaces/Country';
import { CountryMunicipalityService } from 'src/services/country-municipality.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {

  countries: Country[] = [];


  form = new FormGroup({
    countryName: new FormControl("", [Validators.min(1)])
  }
  );

  constructor(private countryMunicipalityService: CountryMunicipalityService){
    countryMunicipalityService.getAllCountries().then(countries=>{
      this.countries=countries;
    }).catch(err=>{
      console.log(err);
    });
  }


  handleAddCountry(){
    console.log("uso");
    this.countryMunicipalityService.addCountry(this.form.value).then((country)=>{
      console.log(country);
    }).catch(err=>{
      console.log(err);
    });
  }

}
