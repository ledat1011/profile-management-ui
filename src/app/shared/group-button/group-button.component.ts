import { Component } from '@angular/core';

@Component({
  selector: 'app-group-button',
  templateUrl: './group-button.component.html',
  styleUrls: ['./group-button.component.scss'],
})
export class GroupButtonComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }
  onClick(callback: Function) {
    // Handle delete logic here 
    callback(this.params.data);
  }

  getClasses(param: any) {
    let classes: { [key: string]: boolean } = {};
    if (param.class) {
        classes[param.class] = true;
    }

    if (param.isDisable) {
        classes['action-icon_disable'] = true;
    }

    return classes;
}
}
