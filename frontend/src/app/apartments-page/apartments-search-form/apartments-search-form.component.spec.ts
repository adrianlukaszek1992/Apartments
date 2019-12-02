import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsSearchFormComponent } from './apartments-search-form.component';

describe('ApartmentsSearchFormComponent', () => {
  let component: ApartmentsSearchFormComponent;
  let fixture: ComponentFixture<ApartmentsSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentsSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
