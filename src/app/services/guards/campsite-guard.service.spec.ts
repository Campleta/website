import { TestBed, inject } from '@angular/core/testing';

import { CampsiteGuardService } from './campsite-guard.service';

describe('CampsiteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampsiteGuardService]
    });
  });

  it('should be created', inject([CampsiteGuardService], (service: CampsiteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
