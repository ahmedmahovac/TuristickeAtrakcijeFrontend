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
  countryAdded: boolean = false;

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)])
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
    this.countryAdded=false;
    this.countryMunicipalityService.addCountry(this.form.value).then((country)=>{
      this.countries.push(country);
      this.countryAdded=true;
      this.form.reset();
    }).catch(err=>{
      console.log(err);
    });
  }


  handleCountryDeleted(id: Number){
    console.log("brisem iz viewa");
    this.countries = this.countries.filter((country)=>{
      return country.id != id;
    })
  }

  handleCountryNameInputChange(){
    this.countryAdded=false;
  }

}
