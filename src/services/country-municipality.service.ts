import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {first, firstValueFrom} from 'rxjs';
import { Country } from 'src/interfaces/Country';
import { Municipality } from 'src/interfaces/Municipality';

@Injectable({
  providedIn: 'root'
})
export class CountryMunicipalityService {

  constructor(private http: HttpClient) { }


  getAllCountries(): Promise<Country[]>{
    return firstValueFrom(this.http.get<Country[]>("http://localhost:8080/api/countries"));
  }

  addCountry(body: any): Promise<Country>{
    return firstValueFrom(this.http.post<Country>("http://localhost:8080/api/countries", body));
  }

  deleteCountry(id: Number): Promise<any>{
    return firstValueFrom(this.http.delete("http://localhost:8080/api/countries/"+id));
  }

  getMunicipalities(countryId: String): Promise<Municipality[]>{
    return firstValueFrom(this.http.get<Municipality[]>("http://localhost:8080/api/countries/"+countryId+ "/municipalities"));
  }

  addMunicipality(countryId: String, body:any): Promise<Municipality>{
    return firstValueFrom(this.http.post<Municipality>("http://localhost:8080/api/countries/"+countryId+"/municipalities", body));
  }

  deleteMunicipality(id: Number): Promise<any>{
    return firstValueFrom(this.http.delete("http://localhost:8080/api/municipalities/"+id));
  }

}
