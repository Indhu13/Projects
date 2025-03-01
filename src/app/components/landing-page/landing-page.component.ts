import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  imports:[CommonModule,HeaderComponent,FooterComponent]
})
export class LandingPageComponent {
  constructor(private router: Router) {}
  startQuiz() {
    this.router.navigate(['/quiz']);
  }
}