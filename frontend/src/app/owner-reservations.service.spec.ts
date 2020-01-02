import { TestBed } from '@angular/core/testing';

import { OwnerReservationsService } from './owner-reservations.service';

describe('OwnerReservationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwnerReservationsService = TestBed.get(OwnerReservationsService);
    expect(service).toBeTruthy();
  });
});
