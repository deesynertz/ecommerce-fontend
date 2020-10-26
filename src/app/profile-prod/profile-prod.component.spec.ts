import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProdComponent } from './profile-prod.component';

describe('ProfileProdComponent', () => {
  let component: ProfileProdComponent;
  let fixture: ComponentFixture<ProfileProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
