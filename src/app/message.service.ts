import { Injectable } from '@angular/core';
import { Message } from './models/message.modal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessageService {

  constructor() { }

  private showMessage = new BehaviorSubject<Message>(null);
  message = this.showMessage.asObservable();

  addMessage(message: Message){
    this.showMessage.next(message);
  }

}
