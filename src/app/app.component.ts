import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isToken: string;
  // isLoggedIn:boolean;
  constructor(private _userSerive: UserService,
              private _router: Router,
              private _messageService: MessageService){

  }
  ngOnInit(){
    console.log(this._userSerive.isLoggedin)
    // this.isLoggedIn= this._userSerive.isLoggedin;
  }
  title = 'app';

  logout(){
    this._userSerive.logout();
    this._router.navigate(['/login']);
  }
}
