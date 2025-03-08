import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent]
})
export class QuizComponent implements OnInit {
  quizForm!: FormGroup;
  currentStep = 1;
  steps = Array(5).fill(0); // 5 segments
  progressPercentage = 0;

  genres: string[] = ['Action', 'Western', 'Horror', 'Romantic', 'Drama', 'Comedy', 'Thriller', 'Hart Buddy Comedy',
    'Science Fiction', 'Noir', 'Fantasy', 'None of the above'];
  experienceLevels = ['0 - 3 years', '4 - 6 years', '7 or more years'];
  movieSnacks = ['Popcorn', 'Nachos', 'Junior Mints', 'Milk Duds', 'Skittles', 'I only watch Collection films.'];
  programmingLanguages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#'];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.quizForm = new FormGroup({

      movieGenre: new FormArray([]), // FormArray for checkboxes
      angularExperience: new FormControl(''),
      favMovieArr: new FormArray([]),
      movieSnack: new FormControl(''),
      addressArr: new FormArray([])

    });
    this.addCheckboxes();
    this.addFavMovie();
    this.addAddress();
    this.updateProgress();
  }

  addFavMovie() {
    this.favMovieArr.push(this.fb.group({
      title: new FormControl(''),
      yearOfRealese: new FormControl('')
    }))

  }
  removeFavMovie(i: number) {
    this.favMovieArr.removeAt(i)

  }
  addAddress() {
    this.addressArr.push(this.fb.group({
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl('')

    }))


  }
  // Getter for easy access in template
  get movieGenreArray() {
    return this.quizForm.get('movieGenre') as FormArray;
  }
  get angularExperience() {
    return this.quizForm.get('angularExperience');
  }
  get movieSnack() {
    return this.quizForm.get('movieSnack');
  }
  get favMovieArr() {
    return this.quizForm.get('favMovieArr') as FormArray
  }
  get addressArr() {
    return this.quizForm.get('addressArr') as FormArray
  }
  get title() {
    return this.favMovieArr.get('title');
  }
  get yearOfRelease() {
    return this.favMovieArr.get('yearOfRelease');
  }
  get address1() {
    return this.addressArr.get('address1');
  }
  get address2() {
    return this.addressArr.get('address2');
  }
  get city() {
    return this.addressArr.get('city');
  }
  get state() {
    return this.addressArr.get('state');
  }
  get zipCode() {
    return this.addressArr.get('zipCode');
  }
  // Add checkboxes to FormArray
  private addCheckboxes() {
    const movieGenreArray = this.quizForm.get('movieGenre') as FormArray;
    this.genres.forEach(() => {
      movieGenreArray.push(new FormControl(false));
    });
  }
  exit() {
    this.router.navigate(['/landing']);
  }
  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
      this.updateProgress();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  updateProgress() {
    this.progressPercentage = (this.currentStep / 5) * 100;
  }

  onSubmit() {
    if (this.quizForm.valid) {
      const selectedGenres = this.genres
        .filter((_, i) => this.movieGenreArray.at(i).value)
        .map((genre) => genre);

      console.log({
        ...this.quizForm.value,
        movieGenre: selectedGenres
      });
      alert('Form Submitted Successfully!');

    }
    this.router.navigate(['/completion']);
  }
}
