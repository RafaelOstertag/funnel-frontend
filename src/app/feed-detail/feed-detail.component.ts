import { Component, OnInit, Input} from '@angular/core';
import { Feed } from '../data/feed';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.scss']
})
export class FeedDetailComponent implements OnInit {
  @Input() feed: Feed;

  constructor() { }

  ngOnInit() {
  }

}
