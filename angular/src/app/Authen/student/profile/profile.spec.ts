import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile } from './profile';

describe('EmployeeUpdateComponent', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Profile]
    });
    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
