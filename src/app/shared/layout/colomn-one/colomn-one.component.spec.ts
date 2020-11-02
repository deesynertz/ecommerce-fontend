import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColomnOneComponent } from './colomn-one.component';

describe('ColomnOneComponent', () => {
  let component: ColomnOneComponent;
  let fixture: ComponentFixture<ColomnOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColomnOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColomnOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
