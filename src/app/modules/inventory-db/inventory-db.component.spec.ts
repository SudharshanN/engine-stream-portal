import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDbComponent } from './inventory-db.component';

describe('InventoryDbComponent', () => {
  let component: InventoryDbComponent;
  let fixture: ComponentFixture<InventoryDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
