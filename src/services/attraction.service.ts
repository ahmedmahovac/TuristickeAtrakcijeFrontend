import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attraction } from '../interfaces/Attraction';
import { firstValueFrom } from 'rxjs';
import { PictureInfo } from '../interfaces/PictureInfo';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  constructor(private http: HttpClient) { }

  async searchAttractions(searchValue: String, popularityValue: String) : Promise<Attraction[]>{
    console.log("poslane vrijednosti " + searchValue + " " + popularityValue);
    let query="";
    if(searchValue!=""){
      query=query+"name="+searchValue;
    }
    if(popularityValue!=""){
      if(searchValue!=""){
        query=query+"&";
      }
      query=query+"popularity="+popularityValue+"";
    }
    console.log(query);
    return firstValueFrom(
      this.http.get<Attraction[]>('http://localhost:8080/api/attractions/search?'+query)
    );
  }


  async getAttractionPictures(attractionId: Number): Promise<PictureInfo[]>{
    return firstValueFrom(
      this.http.get<PictureInfo[]>("http://localhost:8080/api/attractions/"+attractionId+"/pictures")
    );   
}

async getBlobPicture(attractionId: Number, pictureInfoId: Number): Promise<any>{
  return firstValueFrom(this.http.get("http://localhost:8080/api/attractions/"+attractionId+"/pictures/"+pictureInfoId, { responseType: "blob" }));
}

}
