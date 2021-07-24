import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FeedSource} from '../data/feed-source';
import {FeedDetails, FeedItem} from '../data/feed-details';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private feedUrl = environment.feedUrl;

  constructor(private httpClient: HttpClient) {
  }

  private static sortFeedItemsByDate(feedDetails: FeedDetails): FeedDetails {
    feedDetails.feed.feedItems.sort((a: FeedItem, b: FeedItem) => b.created.getTime() - a.created.getTime());
    return feedDetails;
  }

  public getFeedSources(): Observable<FeedSource[]> {
    return this.httpClient.get<FeedSource[]>(this.feedUrl)
      .pipe(
        catchError(this.handleError<FeedSource[]>('getFeeds', []))
      );
  }

  public createFeedSource(feed: FeedSource): Observable<boolean> {
    return this.httpClient.post<void>(this.feedUrl, feed, httpOptions)
      .pipe(
        catchError(this.handleError<boolean>('create', false)),
        map(val => val !== false));
  }

  public deleteFeedSource(name: string): Observable<boolean> {
    const url = `${this.feedUrl}/${name}`;

    return this.httpClient.delete<void>(url, httpOptions)
      .pipe(
        catchError(this.handleError<boolean>('delete', false)),
        map(val => val !== false)
      );
  }

  public getFeedDetails(name: string): Observable<FeedDetails> {
    const url = `${this.feedUrl}/${name}`;
    return this.httpClient.get<FeedDetails>(url, httpOptions)
      .pipe(
        map(this.mapDates),
        map(FeedService.sortFeedItemsByDate),
        catchError(this.handleError<FeedDetails>('feedDetails', new FeedDetails()))
      );
  }

  private mapDates(feedDetails: FeedDetails): FeedDetails {
    feedDetails.feed.lastUpdated = new Date(feedDetails.feed.lastUpdated);
    feedDetails.feed.feedItems.forEach(feedItem => feedItem.created = new Date(feedItem.created));
    return feedDetails;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
