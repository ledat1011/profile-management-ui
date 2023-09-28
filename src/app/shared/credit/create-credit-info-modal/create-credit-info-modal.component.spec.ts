import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreditInfoModalComponent } from './create-credit-info-modal.component';

describe('CreateCreditInfoModalComponent', () => {
  let component: CreateCreditInfoModalComponent;
  let fixture: ComponentFixture<CreateCreditInfoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCreditInfoModalComponent]
    });
    fixture = TestBed.createComponent(CreateCreditInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
