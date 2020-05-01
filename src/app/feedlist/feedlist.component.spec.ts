import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedlistComponent } from './feedlist.component';

describe('FeedlistComponent', () => {
  let component: FeedlistComponent;
  let fixture: ComponentFixture<FeedlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
