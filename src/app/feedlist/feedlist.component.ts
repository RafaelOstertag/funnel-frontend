import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { FeedSource } from '../data/feed-source';
import { Router } from '@angular/router';

@Component({
    selector: 'app-feedlist',
    templateUrl: './feedlist.component.html',
    styleUrls: ['./feedlist.component.scss']
})
export class FeedlistComponent implements OnInit {
    feedSources: FeedSource[] = [];

    constructor(private feedService: FeedService, private router: Router) { }

    ngOnInit(): void {
        this.getFeedSources();
    }

    private getFeedSources(): void {
        this.feedService
            .getFeedSources()
            .subscribe(feedSources => this.feedSources = feedSources);
    }

    addFeedSource(): void {
        this.router.navigate(["/add"]);
    }
}
