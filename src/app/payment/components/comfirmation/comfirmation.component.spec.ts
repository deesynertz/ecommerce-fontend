import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmationComponent } from './comfirmation.component';

describe('ComfirmationComponent', () => {
  let component: ComfirmationComponent;
  let fixture: ComponentFixture<ComfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
