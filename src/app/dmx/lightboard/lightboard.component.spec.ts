import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightboardComponent } from './lightboard.component';

describe('LightboardComponent', () => {
  let component: LightboardComponent;
  let fixture: ComponentFixture<LightboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LightboardComponent]
    });
    fixture = TestBed.createComponent(LightboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
