import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:true
})
export class HeaderComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.username = user.firstName;
    });
    console.log(this.username)
  }

  logout() {
    this.authService.logout();
  }
}
