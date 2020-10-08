import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusInventoryComponent } from './surplus-inventory.component';

describe('SurplusInventoryComponent', () => {
  let component: SurplusInventoryComponent;
  let fixture: ComponentFixture<SurplusInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurplusInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurplusInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
