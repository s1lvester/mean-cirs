import { AppError } from './../common/app-error';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  invalidLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.service.login(this.form.value).subscribe(
      res => {
        this.router.navigate(['/admin']);
      },
      err => {
        this.invalidLogin = true;
      }
    );
  }
}
