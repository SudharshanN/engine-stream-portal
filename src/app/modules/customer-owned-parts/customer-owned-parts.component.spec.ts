import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOwnedPartsComponent } from './customer-owned-parts.component';

describe('CustomerOwnedPartsComponent', () => {
  let component: CustomerOwnedPartsComponent;
  let fixture: ComponentFixture<CustomerOwnedPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOwnedPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOwnedPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
