import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchViewComponent } from './branch-view.component';

describe('BranchViewComponent', () => {
  let component: BranchViewComponent;
  let fixture: ComponentFixture<BranchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
