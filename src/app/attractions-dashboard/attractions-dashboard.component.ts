import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Attraction } from 'src/interfaces/Attraction';
import { PictureInfo } from 'src/interfaces/PictureInfo';
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
  attractionUpdatingId: Number = -1;

  addingAttractionActive : Boolean = false;
  updatingAttractionActive: Boolean = false;

  files: any[] = [];


  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    description: new FormControl("", [Validators.required, Validators.minLength(10)]),
    lat: new FormControl(0, [Validators.required]),
    lon: new FormControl(0, [Validators.required]),
    picture: new FormControl("", [Validators.required])
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
      // upload pictures now
      let promises: Promise<PictureInfo>[] = [];
      this.files.forEach(file=>{
        let formData = new FormData();
        formData.append("picture", file);
        promises.push(this.countryMunicipalityService.addPictures(attraction.id, formData));
      });
      Promise.all(promises).then((addedPictures)=>{
        console.log(addedPictures.length);
        this.files=[];
      }).catch(err=>{
        console.log(err);
        this.files=[];
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
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.files.push(file);
    }
  }


  handleUpdateAttraction(){
    // update attraction with provided data
    this.countryMunicipalityService.updateAttraction(this.attractionUpdatingId, this.form.value).then(attraction=>{
      console.log(attraction);
      this.attractions = this.attractions.map(item=>{
        if(attraction.id==item.id){
          return attraction;
        }
        else return item;
      })
    }).catch(err=>{
      console.log(err);
    });
    this.updatingAttractionActive=false;
  }

  handleAttractionUpdateEvent(attraction: Attraction){
    this.form.patchValue({
      name: attraction.name+"",
      description: attraction.description+"",
      lat: attraction.lat.valueOf(),
      lon: attraction.lon.valueOf()
    });
    this.updatingAttractionActive=true;
    this.attractionUpdatingId=attraction.id;
  }

}
