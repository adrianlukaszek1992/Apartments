import { TestBed } from '@angular/core/testing';

import { ApartmentsService } from './apartments.service';

describe('ApartmentsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApartmentsService = TestBed.get(ApartmentsService);
    expect(service).toBeTruthy();
  });
});
