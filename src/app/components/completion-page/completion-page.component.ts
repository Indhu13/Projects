
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-completion-page',
  standalone: true,
  templateUrl: './completion-page.component.html',
  styleUrl: './completion-page.component.scss',
  imports:[CommonModule,  HeaderComponent,FooterComponent]
})

export class CompletionPageComponent {
  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
