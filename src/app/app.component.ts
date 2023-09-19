import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'profile-management-ui';
  profiles = [
    { id: 1, username: 'nguyen_van_a', email: 'example1@email.com' },
    { id: 2, username: 'tran_thi_b', email: 'example2@email.com' },
  ];
  constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
