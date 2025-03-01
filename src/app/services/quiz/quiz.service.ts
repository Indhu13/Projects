import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  questions = [
    {
      question: 'My favorite movie genre is:',
      type: 'checkbox',
      options: [
        { text: 'Action', selected: false },
        { text: 'Horror', selected: false },
        { text: 'Drama', selected: false },
        { text: 'Thriller', selected: false },
        { text: 'Science Fiction', selected: false },
        { text: 'Fantasy', selected: false },
        { text: 'Western', selected: false },
        { text: 'Romantic', selected: false },
        { text: 'Comedy', selected: false },
        { text: 'Kevin Hart Buddy Comedy', selected: false },
        { text: 'Noir', selected: false },
        { text: 'None of the above', selected: false }
      ]
    },
    {
      question: 'How long have you been an Angular developer?',
      type: 'radio',
      options: [
        { text: '0-3 years' },
        { text: '4-6 years' },
        { text: '7 or more years' }
      ],
      selected: ''
    },
    {
      question: "What is Jerry Seinfeld's address in Seinfeld?",
      type: 'text',
      answer: ''
    }
  ];

  getQuestions() {
    return this.questions;
  }

  saveAnswers() {
    console.log('User Answers:', this.questions);
  }
}
