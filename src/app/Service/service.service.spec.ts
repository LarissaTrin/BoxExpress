/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataService } from './service.service';

describe('Service: Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should ...', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
