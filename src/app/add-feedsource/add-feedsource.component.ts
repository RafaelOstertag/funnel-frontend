import {Component, OnInit} from '@angular/core';
import {FeedService} from '../services/feed.service';
import {FeedSource} from '../data/feed-source';
import {Location} from '@angular/common';


@Component({
  selector: 'app-add-feedsource',
  templateUrl: './add-feedsource.component.html',
  styleUrls: ['./add-feedsource.component.scss']
})
export class AddFeedSourceComponent implements OnInit {
  feedSource: FeedSource;

  constructor(
    private feedService: FeedService,
    private location: Location) {
    this.feedSource = new FeedSource();
  }

  ngOnInit(): void {
    // intentionally empty
  }

  add(): void {
    this.feedService.createFeedSource(this.feedSource).subscribe(success => {
      if (success === true) {
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
