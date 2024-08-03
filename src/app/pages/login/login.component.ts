declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from '../../environment.dev';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private router = inject(Router)
  private authService = inject(AuthService)

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.google_client_id,
      callback: (resp: any) => this.hundleLogin(resp)
    });
    const googleButton = document.getElementById("google-btn");
    if (googleButton) {
      google.accounts.id.renderButton(googleButton, {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      })
    } else {
      console.error('Google button not found.');
    }

  }

  hundleLogin(response: any) {
    // Decode Token
    this.authService.login(response.credential);

    // Navigate to homepage
    this.router.navigate(['home']);
  }

}
