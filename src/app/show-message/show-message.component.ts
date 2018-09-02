import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent implements OnInit {

  alertMsg: string;
  msgType: string;
  msgTypeClass: string;

  constructor(private _messagService: MessageService) { }

  ngOnInit() { 
    this._messagService.message.subscribe(
      message => {
        console.log(message)
        if(message){
          this.alertMsg = message.message;
          // this.msgType = message.type;
          if(message.type == 'success'){
            this.msgTypeClass = 'alert-success';
            this.msgType = 'Success';
          } else if(message.type == 'warn'){
            this.msgTypeClass = 'alert-warning';
            this.msgType = 'Warning';
          } else {
            this.msgTypeClass = 'alert-danger';
            this.msgType = 'Error';
          }
          // clear message
          setTimeout(() => {
            this.alertMsg = null;
          }, 10000);
        }
      }
    )
   }

  ngAfterViewInit(){

  }

}
