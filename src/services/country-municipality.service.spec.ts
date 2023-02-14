import { TestBed } from '@angular/core/testing';

import { CountryMunicipalityService } from './country-municipality.service';

describe('CountryMunicipalityService', () => {
  let service: CountryMunicipalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryMunicipalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
