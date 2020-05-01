import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { FeedSource } from '../data/feed-source';
import { FeedDetails } from '../data/feed-details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    private feedUrl = environment.feedUrl

    constructor(private httpClient: HttpClient) { }

    public getFeedSources(): Observable<FeedSource[]> {
        return this.httpClient.get<FeedSource[]>(this.feedUrl)
            .pipe(
                catchError(this.handleError<FeedSource[]>('getFeeds', []))
            )
    }

    public createFeedSource(feed: FeedSource): Observable<boolean> {
        return this.httpClient.post<void>(this.feedUrl, feed, httpOptions)
            .pipe(
                catchError(this.handleError<boolean>('create', false)),
                map(val => val !== false))
    }

    public deleteFeedSource(name: string): Observable<boolean> {
        const url = `${this.feedUrl}/${name}`;

        return this.httpClient.delete<void>(url, httpOptions)
            .pipe(
                catchError(this.handleError<boolean>('delete', false)),
                map(val => val !== false)
            )
    }

    public getFeedDetails(name: String): Observable<FeedDetails> {
        const url = `${this.feedUrl}/${name}`;
        return this.httpClient.get<FeedDetails>(url, httpOptions)
            .pipe(
                catchError(this.handleError<FeedDetails>('feedDetails', new FeedDetails()))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}
