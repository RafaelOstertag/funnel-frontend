import {FeedSource} from './feed-source';

export class FeedItem {
  title: string;
  link: string;
  created: Date;
}

export class Feed {
  title: string;
  lastUpdated: Date;
  feedItems: FeedItem[];
}

export class FeedDetails {
  source: FeedSource;
  feed: Feed;
}
