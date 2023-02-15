import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {first, firstValueFrom} from 'rxjs';
import { Country } from 'src/interfaces/Country';

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

}
