import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';
import { Message } from '../models/message.modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    contact: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repPass: new FormControl('', Validators.required)
  })

  constructor(private _userService: UserService,
              private _messagServie: MessageService) { }

  ngOnInit() {
  }

  msgType: string;
  alertMsg: string;
  msgTypeClass: string;

  register(){
    if(!this.registerForm.valid || (this.registerForm.value.password !==  this.registerForm.value.repPass)){
      alert('invalid form')
      return;
    }
    console.log(this.registerForm.value);
    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      response => {
        console.log(response);
        this._messagServie.addMessage(
          new Message(response.body['message'], response.body['type'])
        )
        this.registerForm.reset();
      },

      error => {
        console.log(error)
      }
    )

  }




}
