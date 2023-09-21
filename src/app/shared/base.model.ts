import { Directive } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Directive()
export class BaseModal {
    constructor(protected activeModal: NgbActiveModal) { }
}