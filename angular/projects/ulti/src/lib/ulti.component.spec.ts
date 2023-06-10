import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltiComponent } from './ulti.component';

describe('UltiComponent', () => {
  let component: UltiComponent;
  let fixture: ComponentFixture<UltiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UltiComponent]
    });
    fixture = TestBed.createComponent(UltiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
