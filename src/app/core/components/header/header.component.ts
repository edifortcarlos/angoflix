import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/models/user.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() user!: User | null;
  @Output() public onLogout = new EventEmitter<void>();

  navList = [
    { name: 'Home', route: 'home' },
    { name: 'TV Shows', route: '/' },
    { name: 'News & Popular', route: '/' },
    { name: 'My List', route: '/' },
    { name: 'Browse Movie', route: '/' },
  ];

  signOut() {
    this.onLogout.emit();
  }
}
