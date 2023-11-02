import { TestBed } from '@angular/core/testing';

import { DmxService } from './dmx.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Scene } from './models';

describe('DmxService', () => {
  let service: DmxService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(DmxService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test setDMX', () => {
    const testData: Scene = {list: [{channel: 1, value: 5}]};

    service.setDMX(testData).subscribe(() => {});
  
    const req = httpTestingController.expectOne('api/v1/dmx');
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(testData);
    req.flush("");
  
    httpTestingController.verify();
  });

  it('test fadeDMX', () => {
    const testData: Scene = {list: [{channel: 5, value: 99}]};
    const fadeTimeMills = 69;

    service.fadeDMX(testData, fadeTimeMills).subscribe(() => {});
  
    const req = httpTestingController.expectOne('api/v1/dmx/fade');
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual({scene: testData, fadeTimeMillis: fadeTimeMills});
    req.flush("");
  
    httpTestingController.verify();
  });
});
