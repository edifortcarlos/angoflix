import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { User } from '../../shared/model/user.interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user!: User;
  authService = inject(AuthService);

  constructor() {
    const userSection = JSON.parse(sessionStorage.getItem('loged-user')!) as User | null;
    if(userSection){
      this.user = {
        name: userSection.name,
        picture: userSection.picture,
        email: userSection.email
      }
    }
    
  }

  signOut(){
    this.authService.signOut();
  }

}
