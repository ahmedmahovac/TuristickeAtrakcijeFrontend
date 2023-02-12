import { Component } from '@angular/core';
import { Attraction } from '../../interfaces/Attraction';
import { AttractionService } from '../../services/attraction.service';


@Component({
  selector: 'app-search-rate-attractions',
  templateUrl: './search-rate-attractions.component.html',
  styleUrls: ['./search-rate-attractions.component.css']
})
export class SearchRateAttractionsComponent {

  constructor(private attractionService: AttractionService){

  }

  timer: ReturnType<typeof setTimeout> = setTimeout(() => { });
  searchValue: String = "";
  selectedPopularity: String = "";
  attractions: Attraction[] = [];

  handleSearchInputChange(searchValue: String){
    this.searchValue=searchValue;
    clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log("sending api request now"); 
        this.attractionService.searchAttractions(this.searchValue, this.selectedPopularity).then((attractions)=>{
          console.log("dobavio sve atrakcije " + attractions.length);
        }).catch(err=>{
          console.log(err);
        });
      }, 1000); // call specified function after 1s

  }

  handlePopularityChange(popularity: String){
    this.selectedPopularity=popularity;
  }
}
