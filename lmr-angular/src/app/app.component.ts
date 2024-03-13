import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from './service/global.service';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NgFor]
})
export class AppComponent {

  tostSub:Subscription;
  tostMessages: {
    title:string,
    message:string,
    tostType:string
  }[]=[];

  constructor(globalService: GlobalService) {
    this.tostSub = globalService.TostService.subscribe(msg=>{
      this.addTostMessage(msg);
    });
  }
  
  removeTostMessage(msg:any){
    this.tostMessages = this.tostMessages.filter(m=>m.message!=msg);
  }

  addTostMessage(tostMessage: {
    title:string,
    message:string,
    tostType:string
  }): any {
    if(tostMessage.title || tostMessage.message){
      this.tostMessages.push(tostMessage);
    }
  }
}
