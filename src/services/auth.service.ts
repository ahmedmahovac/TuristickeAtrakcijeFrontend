import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {

   }


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

  setJwtToken(token: string){
    localStorage.setItem("jwt", token);
  }

  getJwtToken() : String | null{
    return localStorage.getItem("jwt");
  }

  removeJwtToken(){
    localStorage.removeItem("jwt");
  }


  isLoggedIn():boolean{
    return localStorage.getItem("jwt")!==null;
  }

  logout(){
    this.removeJwtToken();
  }

}
