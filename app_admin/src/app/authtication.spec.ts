import { TestBed } from '@angular/core/testing';

import { Authtication } from './authtication';

describe('Authtication', () => {
  let service: Authtication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authtication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
