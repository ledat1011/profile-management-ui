import { Component } from '@angular/core';
import { BaseModal } from '../bast-modal.component';
import { ButtonActionModel } from 'src/app/model/button-acction.model';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent extends BaseModal{
  title!:String;
  content!:String;
  buttonActions!:ButtonActionModel[];
  data!:any;

  onClickButton(){
    this.activeModal.close(this.data)
  }
}
