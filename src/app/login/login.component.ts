import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){

  }

  form = new FormGroup({
    username: new FormControl("",  [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  loginInvalid: boolean = false;

  handleLoginFormSubmit(){
    console.log("saljem login zahtjev");
    this.loginInvalid=false;
    this.authService.login(this.form.value).then(response=>{
      console.log(response);
      this.authService.setJwtToken(response.token);
      this.router.navigate(["/dashboard"]);
    }).catch(err=>{
      console.log(err);
      this.loginInvalid=true;
    });
  }

}
