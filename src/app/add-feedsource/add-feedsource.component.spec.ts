import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AddFeedSourceComponent} from './add-feedsource.component';

describe('AddFeedSourceComponent', () => {
  let component: AddFeedSourceComponent;
  let fixture: ComponentFixture<AddFeedSourceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeedSourceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
