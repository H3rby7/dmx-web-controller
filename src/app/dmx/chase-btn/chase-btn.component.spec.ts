import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaseBtnComponent } from './chase-btn.component';

describe('ChaseBtnComponent', () => {
  let component: ChaseBtnComponent;
  let fixture: ComponentFixture<ChaseBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChaseBtnComponent]
    });
    fixture = TestBed.createComponent(ChaseBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
