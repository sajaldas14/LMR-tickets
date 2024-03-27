import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiserviceService } from '../service/apiservice.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';


@Component({
  selector: 'app-message',
  standalone: true,
  imports:  [FormsModule, NgFor, NgIf,NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  s: string = "";
  r: string = "";
  conversations: any[]=[];

  formData: any = {
    messagetext: '',
    atachment: ''
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiserviceService
  ) {
  }
  ngOnInit(): void {
    this.s = this.route.snapshot.paramMap.get("s") ?? "";
    this.r = this.route.snapshot.paramMap.get("r") ?? "";
    this.refreshChatMessages();
  }
  refreshChatMessages() {
    this.api.getConversatations(this.s, this.r).subscribe((res: any) => {
      this.conversations = res.data;
      console.log(this.conversations);
    });
  }

  sendMessage(message: string, atachmentId: string = "") {
    this.api.sendMessage(this.s, {
      reciver: this.r,
      message_data: message,
      attachment: atachmentId
    }).subscribe((res)=>{
      this.refreshChatMessages();
      this.formData.messagetext = '';
      this.formData.atachment='';

    });
  }

  onSaveMessage() {
    this.sendMessage(this.formData.messagetext, this.formData.atachment)
  }
  
  userfileChanged(event: any) {
    this.formData.atachment = "The atachemtn.pdf"
  }

}
