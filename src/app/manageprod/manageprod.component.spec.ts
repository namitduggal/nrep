import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageprodComponent } from './manageprod.component';

describe('ManageprodComponent', () => {
  let component: ManageprodComponent;
  let fixture: ComponentFixture<ManageprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
