import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipality } from 'src/interfaces/Municipality';
import { CountryMunicipalityService } from 'src/services/country-municipality.service';

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.css']
})
export class MunicipalityComponent {
  constructor(private countryMunicipalityService: CountryMunicipalityService, private router: Router, private route: ActivatedRoute){

  }

  @Input()
  municipality: Municipality = {id: -1, name: "", countryId: -1};

  @Output()
  municipalityDeletedEvent = new EventEmitter<Number>();

  handleDeleteMunicipality(){
    console.log("deleting country");
    this.countryMunicipalityService.deleteMunicipality(this.municipality.id).then(response=>{
      // emit output to remove deleted municipality from view
      this.municipalityDeletedEvent.emit(this.municipality.id); 
    }).catch(err=>{
      console.log(err);
    });
  }


  handleOpenMunicipality(){
    this.router.navigate([this.municipality.id+"/attractions"], {relativeTo: this.route});
  }
}
