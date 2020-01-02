import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentOwnerPageComponent } from './apartment-owner-page.component';

describe('ApartmentOwnerPageComponent', () => {
  let component: ApartmentOwnerPageComponent;
  let fixture: ComponentFixture<ApartmentOwnerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentOwnerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentOwnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
