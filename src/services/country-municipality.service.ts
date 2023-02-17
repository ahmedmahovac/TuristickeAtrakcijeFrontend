import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {first, firstValueFrom} from 'rxjs';
import { Country } from 'src/interfaces/Country';
import { Municipality } from 'src/interfaces/Municipality';
import { Attraction } from 'src/interfaces/Attraction';
import { PictureInfo } from 'src/interfaces/PictureInfo';

@Injectable({
  providedIn: 'root'
})
export class CountryMunicipalityService {

  constructor(private http: HttpClient) { }

  host = "http://localhost:8080/";

  async getAllCountries(): Promise<Country[]>{
    return firstValueFrom(this.http.get<Country[]>(this.host+"api/countries"));
  }

  async addCountry(body: any): Promise<Country>{
    return firstValueFrom(this.http.post<Country>(this.host+"api/countries", body));
  }

  async deleteCountry(id: Number): Promise<any>{
    return firstValueFrom(this.http.delete(this.host+"api/countries/"+id));
  }

  async getMunicipalities(countryId: String): Promise<Municipality[]>{
    return firstValueFrom(this.http.get<Municipality[]>(this.host+"api/countries/"+countryId+ "/municipalities"));
  }

  async addMunicipality(countryId: String, body:any): Promise<Municipality>{
    return firstValueFrom(this.http.post<Municipality>(this.host+"api/countries/"+countryId+"/municipalities", body));
  }

  async deleteMunicipality(id: Number): Promise<any>{
    return firstValueFrom(this.http.delete(this.host+"api/municipalities/"+id));
  }

  async getCountry(id: String): Promise<Country>{
    return firstValueFrom(this.http.get<Country>(this.host+"api/countries/"+id));
  }


  async getMunicipality(id: String): Promise<Municipality>{
    return firstValueFrom(this.http.get<Municipality>(this.host+"api/municipalities/"+id));
  }

  async getAttractions(municipalityId: String): Promise<Attraction[]>{
    return firstValueFrom(this.http.get<Attraction[]>(this.host+"api/municipalities/"+municipalityId+"/attractions"));
  }

  async addAttraction(municipalityId: String, body: any): Promise<Attraction>{
    return firstValueFrom(this.http.post<Attraction>(this.host+"api/municipalities/"+municipalityId+"/attractions", body));
  }

  async deleteAttraction(id: String): Promise<any>{
    return firstValueFrom(this.http.delete(this.host+"api/attractions/"+id));
  }

  async addPictures(id: Number, formData: FormData): Promise<PictureInfo>{
    return firstValueFrom(this.http.post<PictureInfo>(this.host+"api/attractions/"+id+"/picture",formData));
  }



  async setActiveAttraction(attraction: Attraction, value: boolean): Promise<Attraction>{
    attraction.active = value;
      return firstValueFrom(this.http.put<Attraction>(this.host+"api/attractions/"+attraction.id, attraction));
  }

}
