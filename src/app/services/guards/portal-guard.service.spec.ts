import { TestBed, inject } from '@angular/core/testing';

import { PortalGuardService } from './portal-guard.service';

describe('PortalGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortalGuardService]
    });
  });

  it('should ...', inject([PortalGuardService], (service: PortalGuardService) => {
    expect(service).toBeTruthy();
  }));
});
