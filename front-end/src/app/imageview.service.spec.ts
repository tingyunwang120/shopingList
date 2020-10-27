import { TestBed } from '@angular/core/testing';

import { ImageviewService } from './imageview.service';

describe('ImageviewService', () => {
  let service: ImageviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
