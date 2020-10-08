import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UesrLoginComponent } from './uesr-login.component';

describe('UesrLoginComponent', () => {
  let component: UesrLoginComponent;
  let fixture: ComponentFixture<UesrLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UesrLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UesrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
