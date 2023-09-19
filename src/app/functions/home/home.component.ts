import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(){}
  profiles = [
    { id: 1, username: 'nguyen_van_a', email: 'example1@email.com' },
    { id: 2, username: 'tran_thi_b', email: 'example2@email.com' },
  ];
}
