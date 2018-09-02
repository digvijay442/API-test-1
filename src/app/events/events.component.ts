import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Message } from '../models/message.modal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events;

  constructor( private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService) { }

  ngOnInit() {
    this._userService.showEvents()
    .subscribe(
      res => {
        if(res){
          this.events = res;
        }
      },
      err => {
        this._router.navigate(['/login']);
        this._messageService.addMessage(
          new Message('Please login to visit home page', 'warn')
        )
      }
    )

  }

}
