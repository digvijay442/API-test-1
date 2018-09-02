import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Message } from '../models/message.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any = {};

  constructor(private _userService: UserService,
              private _router: Router,
              private _messageService: MessageService) {

                this._userService.home()
                .subscribe(
                  response => {
                    this.user = response;
                      // _messageService.addMessage(
                      //   new Message('Logged in', 'success')
                      // )
                  }, 
                  error => {
                    this._router.navigate(['/login']);
                    this._messageService.addMessage(
                      new Message('Please login to visit home page', 'warn')
                    )
                  }
                )
               }

  ngOnInit() {
  }

}
