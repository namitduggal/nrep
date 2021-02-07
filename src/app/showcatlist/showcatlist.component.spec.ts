import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcatlistComponent } from './showcatlist.component';

describe('ShowcatlistComponent', () => {
  let component: ShowcatlistComponent;
  let fixture: ComponentFixture<ShowcatlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcatlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcatlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
