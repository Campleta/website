import { TestBed, inject } from '@angular/core/testing';

import { StartupServiceService } from './startup-service.service';

describe('StartupServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartupServiceService]
    });
  });

  it('should be created', inject([StartupServiceService], (service: StartupServiceService) => {
    expect(service).toBeTruthy();
  }));
});
