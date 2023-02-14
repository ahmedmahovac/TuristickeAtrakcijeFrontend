import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  register(body: any): Promise<any>{
    return firstValueFrom(
      this.http.post("http://localhost:8080/api/auth/register", body)
      );
  }

  login(body: any): Promise<any>{
    return firstValueFrom(
      this.http.post("http://localhost:8080/api/auth/login", body)
      );
  }


}
