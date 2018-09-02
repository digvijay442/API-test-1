import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormControlName, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { tokenKey } from '@angular/core/src/view';
import { MessageService } from '../message.service';
import { Message } from '../models/message.modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private _userServie: UserService,
              private _router: Router,
            private _messageService: MessageService) { }

  ngOnInit() {
  }

  login(){
    if(!this.loginForm.valid){
      alert('invalid form')
      return;
    }
    console.log(this.loginForm.value);

    this._userServie.login(this.loginForm.value)
    .subscribe(
      response => {
        console.log(response);
        localStorage.setItem('tokenKey', response.toString());
        this._messageService.addMessage(
          new Message('Logged in', 'success')
        )
        this._router.navigate(['/home']);
        this._userServie.isLoggedin = true;
      }
    )

  }

}
