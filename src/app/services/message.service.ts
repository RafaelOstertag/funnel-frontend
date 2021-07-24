import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() {
    // intentionally empty
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
