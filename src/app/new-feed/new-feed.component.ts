import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Feed } from '../data/feed'
import { FeedService } from '../services/feed.service'
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.scss']
})
export class NewFeedComponent implements OnInit {
  @Input() show = false;
  @Output() feedAdded = new EventEmitter<Feed>();
  @Output() feedAddCanceled = new EventEmitter<void>();
  newFeed: Feed;

  constructor(private feedService: FeedService) { 
    this.newFeed = new Feed();
  }

  ngOnInit() {
  }

  private create(): void {
    this.feedService.createFeed(this.newFeed, ()=> {
      this.feedAdded.emit(this.newFeed)
    })
    .pipe(tap(()=>this.newFeed = new Feed()))
    .subscribe()
  }

  private cancel(): void {
      this.feedAddCanceled.emit();
  }
}
