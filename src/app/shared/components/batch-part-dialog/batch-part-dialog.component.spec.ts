import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchPartDialogComponent } from './batch-part-dialog.component';

describe('BatchPartDialogComponent', () => {
  let component: BatchPartDialogComponent;
  let fixture: ComponentFixture<BatchPartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchPartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchPartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
