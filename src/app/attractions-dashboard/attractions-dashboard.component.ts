import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Attraction } from 'src/interfaces/Attraction';
import { CountryMunicipalityService } from 'src/services/country-municipality.service';

@Component({
  selector: 'app-attractions-dashboard',
  templateUrl: './attractions-dashboard.component.html',
  styleUrls: ['./attractions-dashboard.component.css']
})
export class AttractionsDashboardComponent {
  

  attractions: Attraction[] = [];
  attractionAdded: boolean = false;
  countryId: String = "";
  municipalityId: String="";
  municipalityName: String = "";
  countryName: String = "";
  

  addingAttractionActive : Boolean = false;

  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    description: new FormControl("", [Validators.required, Validators.minLength(10)]),
    lat: new FormControl(null, [Validators.required]),
    lon: new FormControl(null, [Validators.required]),
    picture: new FormControl("", [Validators.required]),
    pictureSource: new FormControl("", [Validators.required])
  }
  );


  constructor(private countryMunicipalityService: CountryMunicipalityService, private activatedRoute: ActivatedRoute){
  }


  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=>{
      let countryId = params.get("countryId");
      let municipalityId = params.get("municipalityId");
      if(countryId!==null && municipalityId!==null){
        this.countryId = countryId;
        this.municipalityId = municipalityId;
        this.countryMunicipalityService.getAttractions(municipalityId).then(attractions=>{
          this.attractions=attractions;
        }).catch(err=>{
          console.log(err);
        });
        this.countryMunicipalityService.getCountry(countryId).then(country=>{
          this.countryName=country.name;
        });
        this.countryMunicipalityService.getMunicipality(municipalityId).then(municipality=>{
          this.municipalityName=municipality.name;
        })
      }
    })


  }





  handleAddAttraction(){
    this.attractionAdded=false;
    this.countryMunicipalityService.addAttraction(this.municipalityId, this.form.value).then((attraction)=>{
      this.attractions.push(attraction);
      this.form.reset();
      // sad uploaduj slike
      const formData = new FormData();
      formData.append("picture",this.form.get("pictureSource")?.value!);
      console.log(this.form.get("pictureSource")?.value!);
      this.countryMunicipalityService.addPictures(attraction.id, formData).then((response)=>{
        console.log(response);
      }).catch(err=>{
        console.log(err);
      });
      this.attractionAdded=true;
    }).catch(err=>{
      console.log(err);
    });
  }


  handleAttractionDeleted(id: Number){
    console.log("brisem attraction iz viewa");
    this.attractions = this.attractions.filter((attractions)=>{
      return attractions.id != id;
    })
  }



  handleActivateAddingAttraction(){
    this.addingAttractionActive=true;
  }

  handleInputChange(){
    this.attractionAdded=false;
  }

  handleFileChange(event:any){
    console.log("uso");
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.form.patchValue({
        pictureSource: file
      });
    }
  }


}
