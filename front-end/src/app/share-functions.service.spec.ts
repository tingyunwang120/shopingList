import { TestBed } from '@angular/core/testing';

import { ShareFunctionsService } from './share-functions.service';

describe('ShareFunctionsService', () => {
  let service: ShareFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
