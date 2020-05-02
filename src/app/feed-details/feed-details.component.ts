import { Component, OnInit } from '@angular/core';
import { FeedDetails } from '../data/feed-details';
import { ActivatedRoute } from '@angular/router';
import { FeedService } from '../services/feed.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-feed-details',
    templateUrl: './feed-details.component.html',
    styleUrls: ['./feed-details.component.scss']
})
export class FeedDetailsComponent implements OnInit {
    feedDetails: FeedDetails;
    
    constructor(
        private route: ActivatedRoute,
        private feedService: FeedService,
        private location: Location) { }

    ngOnInit(): void {
        this.getFeedDetails();
    }

    getFeedDetails(): void {
        const name = this.getFeedName();
        this.feedService.getFeedDetails(name).subscribe(feedDetails => this.feedDetails = feedDetails);
    }

    deleteFeed(): void {
        const name = this.getFeedName();
        this.feedService.deleteFeedSource(name).subscribe(
            ok => {
                if (ok) {
                    this.goBack();
                }
            }
        )
    }

    private getFeedName(): string {
        return this.route.snapshot.paramMap.get('name');
    }

    goBack(): void {
        this.location.back();
    }

}
