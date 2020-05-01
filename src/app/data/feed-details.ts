import { FeedSource } from './feed-source';

export class FeedItem {
    id: string;
    title: string;
    link: string;
    created: Date;
}

export class Feed {
    id: string;
    title: string;
    feedItems: FeedItem[];
}

export class FeedDetails {
    source: FeedSource;
    feed: Feed;
}
