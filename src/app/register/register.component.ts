import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService){

  }

  form = new FormGroup({
    username: new FormControl("",  [Validators.required, Validators.minLength(5)]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl("", [Validators.required])
  });

  onPasswordChange() {
    if (this.form.get("confirmPassword")?.value == this.form.get("password")?.value) {
      this.form.get("confirmPassword")?.setErrors(null);
    } else {
      this.form.get("confirmPassword")?.setErrors({ mismatch: true });
    }
  }

  handleRegisterFormSubmit(){
    console.log("register request sent");
    this.authService.register(this.form.value).then((result)=>{
      console.log(result);
    }).catch(err=>{
      console.log(err);
    });
  }


}
