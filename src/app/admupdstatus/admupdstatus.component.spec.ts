import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmupdstatusComponent } from './admupdstatus.component';

describe('AdmupdstatusComponent', () => {
  let component: AdmupdstatusComponent;
  let fixture: ComponentFixture<AdmupdstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmupdstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmupdstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
