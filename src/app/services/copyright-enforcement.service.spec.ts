import { TestBed } from '@angular/core/testing';

import { CopyrightEnforcementService } from './copyright-enforcement.service';

describe('CopyrightEnforcementService', () => {
  let service: CopyrightEnforcementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyrightEnforcementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
