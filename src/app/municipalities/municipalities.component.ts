import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Municipality } from 'src/interfaces/Municipality';
import { CountryMunicipalityService } from 'src/services/country-municipality.service';

@Component({
  selector: 'app-municipalities',
  templateUrl: './municipalities.component.html',
  styleUrls: ['./municipalities.component.css']
})
export class MunicipalitiesComponent {


  municipalities: Municipality[] = [];
  municipalityAdded: boolean = false;
  countryId: String = "";

  form = new FormGroup({
    name: new FormControl("", [Validators.required])
  }
  );


  constructor(private countryMunicipalityService: CountryMunicipalityService, private activatedRoute: ActivatedRoute){
  }


  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=>{
      let countryId = params.get("countryId");
      console.log("dobavljam opcine za drzavu sa id-em " + countryId);
      if(countryId!==null){
        this.countryId = countryId;
        this.countryMunicipalityService.getMunicipalities(countryId).then(municipalities=>{
          console.log("dobavljene opcine " + municipalities.length);
          this.municipalities=municipalities;
        }).catch(err=>{
          console.log(err);
        });
      }
    })


  }





  handleAddMunicipality(){
    this.municipalityAdded=false;
    this.countryMunicipalityService.addMunicipality(this.countryId, this.form.value).then((municipality)=>{
      this.municipalities.push(municipality);
      this.municipalityAdded=true;
    }).catch(err=>{
      console.log(err);
    });
  }


  handleMunicipalityDeleted(id: Number){
    console.log("brisem municipality iz viewa");
    this.municipalities = this.municipalities.filter((municipality)=>{
      return municipality.id != id;
    })
  }


  handleMunicipalityNameInputChange(){
    this.municipalityAdded=false;
  }

}
