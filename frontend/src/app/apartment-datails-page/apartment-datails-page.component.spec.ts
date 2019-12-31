import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDatailsPageComponent } from './apartment-datails-page.component';

describe('ApartmentDatailsPageComponent', () => {
  let component: ApartmentDatailsPageComponent;
  let fixture: ComponentFixture<ApartmentDatailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentDatailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentDatailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
