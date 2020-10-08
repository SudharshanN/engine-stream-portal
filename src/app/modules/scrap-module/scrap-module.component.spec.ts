import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapModuleComponent } from './scrap-module.component';

describe('ScrapModuleComponent', () => {
  let component: ScrapModuleComponent;
  let fixture: ComponentFixture<ScrapModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
