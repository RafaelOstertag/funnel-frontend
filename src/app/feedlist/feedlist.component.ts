import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { Feed } from '../data/feed';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-feedlist',
    templateUrl: './feedlist.component.html',
    styleUrls: ['./feedlist.component.scss']
})
export class FeedlistComponent implements OnInit {
    public feeds: Feed[]
    public selectedFeed: Feed;
    public showNewFeed: boolean = false;

    constructor(private feedService: FeedService) { }

    ngOnInit() {
        this.getFeeds()
    }

    private delete(feed: Feed): void {
        this.feedService.deleteFeed(feed, () => {
            this.feeds = this.feeds.filter(f => f.name !== feed.name)
        }).subscribe()
    }

    private onSelect(feed: Feed): void {
        this.selectedFeed = feed;
    }

    private onFeedAdded(feed: Feed): void {
        this.feeds.push(feed);
        this.showNewFeed = false;
    }

    private getFeeds() {
        this.feedService.getFeeds().subscribe(feeds => this.feeds = feeds);
    }

    public onNewFeed(): void {
        this.showNewFeed = !this.showNewFeed;
    }

    public onFeedAddCanceled(): void {
        this.showNewFeed = false;
    }
}
