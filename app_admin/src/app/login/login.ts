import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authtication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  public formError: string = '';
  submitted = false;
  credentials = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (
      !this.credentials.email ||
      !this.credentials.password ||
      !this.credentials.name
    ) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    const newUser = {
      name: this.credentials.name,
      email: this.credentials.email,
    } as User;
    // console.log('LoginComponent::doLogin');
    // console.log(this.credentials);
    this.authenticationService.login(newUser, this.credentials.password).subscribe({
      next: () => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
        this.formError = 'Login failed. Please try again.';
      },
    });
  }
}