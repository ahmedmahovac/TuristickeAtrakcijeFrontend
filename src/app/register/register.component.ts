import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router){

  }

  form = new FormGroup({
    username: new FormControl("",  [Validators.required, Validators.minLength(5)]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl("", [Validators.required])
  });

  registrationSuccessful: boolean = false;

  onPasswordChange() {
    if (this.form.get("confirmPassword")?.value == this.form.get("password")?.value) {
      this.form.get("confirmPassword")?.setErrors(null);
    } else {
      this.form.get("confirmPassword")?.setErrors({ mismatch: true });
    }
  }

  handleRegisterFormSubmit(){
    this.registrationSuccessful=false;
    console.log("register request sent");
    this.authService.register(this.form.value).then((response)=>{
      console.log(response);
      this.registrationSuccessful=true;
      this.authService.setJwtToken(response.token);
      this.router.navigate(["/dashboard"]);
    }).catch(err=>{
      console.log(err);
    });
  }


}
