import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsubcatlistComponent } from './showsubcatlist.component';

describe('ShowsubcatlistComponent', () => {
  let component: ShowsubcatlistComponent;
  let fixture: ComponentFixture<ShowsubcatlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsubcatlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsubcatlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
