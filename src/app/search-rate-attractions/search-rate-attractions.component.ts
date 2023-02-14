import { Component } from '@angular/core';
import { Attraction } from '../../interfaces/Attraction';
import { PictureInfo } from '../../interfaces/PictureInfo';
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
  searchRequestSent: Boolean = false;
  attractions: Attraction[] = [];

  handleSearchInputChange(searchValue: String){
    this.searchValue=searchValue;
    clearTimeout(this.timer);
    this.searchRequestSent=true;
      this.timer = setTimeout(() => {
        this.attractions = []; // so it doesn't add up
        console.log("sending api request now"); 
        this.attractionService.searchAttractions(this.searchValue, this.selectedPopularity).then((attractions)=>{
          console.log("dobavio sve atrakcije " + attractions.length);
          this.searchRequestSent=false; // to stop loading indicator being displayed, even tho not all needed information is loaded
          console.log("sad jos slike da dobavim");
          attractions.forEach((attraction,attractionIndex)=>{
            attraction.images = []; // so it cant be undefined
            console.log("dobavljam slike atrakcija za atrakciju sa id-em " + attraction.id);
            this.attractionService.getAttractionPictures(attraction.id).then(pictureInfos=>{
              console.log("dobavio picture info za atrakciju sa id-em " + attraction.id + " velicine " + pictureInfos.length);
              if(pictureInfos.length==0){
                this.attractions.push(attraction);
              }
              pictureInfos.forEach((pictureInfo, pictureInfoIndex)=>{
                console.log("dobavljam blob pictureInfo-a");
                this.attractionService.getBlobPicture(attraction.id, pictureInfo.id).then((imageBlob=>{
                  let reader = new FileReader();
                  reader.addEventListener("load", () => {
                    attraction.images.push(reader.result);
                    if(pictureInfoIndex==pictureInfos.length-1){
                      this.attractions.push(attraction); 
                    }
                  }, false);
               
                  if (imageBlob) {
                     reader.readAsDataURL(imageBlob);
                  }
                })).catch(err=>{
                  console.log(err);
                });
              });
            }).catch(err=>{
              console.log(err);
            });
          });
        }).catch(err=>{
          console.log(err);
        });
      }, 1000); // call specified function after 1s

  }

  handleSearch(){
    this.handleSearchInputChange(this.searchValue);
  }

  handlePopularityChange(popularity: String){
    this.selectedPopularity=popularity;
    this.handleSearchInputChange(this.searchValue);
  }
}
