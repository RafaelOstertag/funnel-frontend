import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Feed } from '../data/feed';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class FeedService {
    private feedAddedEventEmitter = new Subject<Feed>()
  private feedUrl = environment.feedUrl

  constructor(private httpClient: HttpClient,
    private messageService: MessageService) { }

  getFeeds(): Observable<Feed[]> {
    return this.httpClient.get<Feed[]>(this.feedUrl)
    .pipe(
      catchError(this.handleError<Feed[]>('getFeeds', []))
    )
  }

  createFeed(feed: Feed, onSuccess = (()=>{})) : Observable<boolean> {
    return this.httpClient.post<void>(this.feedUrl, feed, httpOptions)
    .pipe(
      catchError(this.handleError<boolean>('create', false)),
      map(val => val !== false),
      tap(success => {
          if(success) {
            onSuccess()
            this.feedAddedEventEmitter.next(feed)
          } 
        }
      )
    )
  }

  public getFeedAddedEventEmitter() : Subject<Feed> {
      return this.feedAddedEventEmitter;
  }

  deleteFeed(feed: Feed, onSuccess = (() => {})): Observable<boolean> {
    const name = feed.name;
    const url = `${this.feedUrl}/${name}`;

    return this.httpClient.delete<void>(url, httpOptions)
    .pipe(
      catchError(this.handleError<boolean>('delete', false)),
      map(val => val !== false),
      tap(success => success && onSuccess())
    )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`FeedService: ${message}`);
  }
}
