import { TestBed } from '@angular/core/testing';

import { CreditProfileService } from './credit-profile.service';

describe('CreditProfileService', () => {
  let service: CreditProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
