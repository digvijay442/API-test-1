import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Message } from '../models/message.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  isLoggedIn = localStorage.getItem("tokenKey") ? true : false;

  addEventForm: FormGroup = new FormGroup({
    eventName: new FormControl('', Validators.required),
    eventOrganiser: new FormControl('', Validators.required),
    eventTime: new FormControl('', Validators.required),
    eventLocation: new FormControl('', Validators.required)
  })

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _router: Router,
  ) { }

  ngOnInit() {
    if(!this.isLoggedIn){
      this._router.navigate(['/login']);
      this._messageService.addMessage(
        new Message('Please login to visit home page', 'warn')
      )
    }
  }

  submitEvent(){
    if(!this.addEventForm.valid){
      this._messageService.addMessage(
        new Message('Please validate form', 'error')
      )
    }
    this._userService.addEvent( JSON.stringify(this.addEventForm.value))
    .subscribe(
      response => {
        console.log(response);
        this.addEventForm.reset();
        if(response.ok){
          this._messageService.addMessage(
            new Message(response.body["message"], "success")
          )
        }
        this._router.navigate(['/events'])
      },

      error => {
        debugger
        this._router.navigate(['/login']);
        this._messageService.addMessage(
          new Message('Please login to visit home page', 'warn')
        )
      }
    )
  }

}
