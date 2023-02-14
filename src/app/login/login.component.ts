import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService){

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
    }).catch(err=>{
      console.log(err);
      this.loginInvalid=true;
    });
  }

}
