import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsPageComponent } from './apartments-page.component';

describe('ApartmentsPageComponent', () => {
  let component: ApartmentsPageComponent;
  let fixture: ComponentFixture<ApartmentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
