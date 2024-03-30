import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/model/user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  @Input() user!: User;
  @Output( ) public onLogout = new EventEmitter<void>();

  navList = ['Home', 'TV Shows', 'News & Popular', 'My List', 'Browse by Linguage'];

  signOut(){
    this.onLogout.emit();
  }
}
