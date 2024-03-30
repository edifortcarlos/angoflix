declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  private router = inject(Router)

  ngOnInit(): void {
      google.accounts.id.initialize({
        client_id: '845485774653-b0d36am71471guj1ug94g3tok3110hsm.apps.googleusercontent.com',
        callback: (resp: any) => this.hundleLogin(resp)
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      })
  }

  private decodeToke(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  hundleLogin(response: any){
    // Decode Token
    const payload = this.decodeToke(response.credential);

    // Store in Session
    sessionStorage.setItem('loged-user', JSON.stringify(payload))

    // Navigate to homepage
    this.router.navigate(['home']);
  }

}
