import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
import { Message } from './models/message.modal';

@Injectable()
export class UserService {
  // registerUrl = 'https://mighty-spire-92685.herokuapp.com/users/register';
  // loginUrl = 'https://mighty-spire-92685.herokuapp.com/users/login';
  // homeUrl = 'https://mighty-spire-92685.herokuapp.com/users/home';
  // logoutUrl = 'https://mighty-spire-92685.herokuapp.com/users/logout';
  
    registerUrl = 'http://localhost:3000/users/register';
    loginUrl = 'http://localhost:3000/users/login';
    homeUrl = 'http://localhost:3000/users/home';
    logoutUrl = 'http://localhost:3000/users/logout';
    showEventsUrl = 'http://localhost:3000/event/showEvents';
    addEventUrl = 'http://localhost:3000/event/addEvent';

  isLoggedin: boolean = false;

  constructor(private _http: HttpClient,
              private _messageService: MessageService) { 
                if(localStorage.getItem('tokenKey')){
                  this.isLoggedin = true;
                }
              }

  showEvents(){
    return this._http.get(this.showEventsUrl, {
      observe: 'body',
      params: new HttpParams().append('tokenKey',localStorage.getItem('tokenKey'))
    })
  }

  addEvent(body: any){
    return this._http.post(this.addEventUrl, body, {
      observe: 'response',
      headers: new HttpHeaders().append('Content-Type','application/json'),
      params: new HttpParams().append('tokenKey',localStorage.getItem('tokenKey'))
    })
  }

  register(body: any){
    return this._http.post(this.registerUrl, body, {
      observe: 'response',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body: any){
    console.log(body);
    return this._http.post(this.loginUrl,body, {
      observe: 'body'
    })

  }

  home(){
    return this._http.get(this.homeUrl, {
      observe: 'body',
      params: new HttpParams().append('tokenKey',localStorage.getItem('tokenKey'))
    })
  }

  logout(){
    localStorage.removeItem('tokenKey');
    this._messageService.addMessage(
      new Message('Logged out', 'success')
    );
    this.isLoggedin = false;
  }

}
