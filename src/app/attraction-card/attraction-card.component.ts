import { Component, Input } from '@angular/core';
import { Attraction } from '../../interfaces/Attraction';
import { AttractionService } from '../../services/attraction.service';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.css']
})
export class AttractionCardComponent {

  constructor(private attractionService: AttractionService){

  }


  @Input()
  attraction: Attraction = {id: -1, name: "", description: "", lat: 0.0, lon: 0.0, ratingAvg: 0.0, municipalityName: "", countryName: "", images: [], active: false};
  attractionRated: boolean = false;
  //rating: number = this.attraction.ratingsCount==0 ? 0 : this.attraction.ratingSum / this.attraction.ratingsCount;


  // this.attraction.ratingsCount==0 ? 0 : this.attraction.ratingSum / this.attraction.ratingsCount

  handleRatingChange(newRating: number){
    // rating property is already bidirectionally binded, we have no use of this parameter but we need this event in order to know when to send api request
    this.attractionService.rateAttraction(this.attraction.id, this.attraction.ratingAvg).then((updatedAttraction)=>{
      this.attraction.ratingAvg=updatedAttraction.ratingAvg;
      this.attractionRated=true;
    }).catch(err=>{
      console.log(err);
    });
    //this.rating = this.attraction.ratingsCount==0 ? 0 : this.attraction.ratingSum / this.attraction.ratingsCount;
  }

}
