import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmallordersComponent } from './admallorders.component';

describe('AdmallordersComponent', () => {
  let component: AdmallordersComponent;
  let fixture: ComponentFixture<AdmallordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmallordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmallordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
