import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproductdetailsComponent } from './showproductdetails.component';

describe('ShowproductdetailsComponent', () => {
  let component: ShowproductdetailsComponent;
  let fixture: ComponentFixture<ShowproductdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowproductdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
