import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../service/apiservice.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})

export class AdminLoginComponent {

  loginData:any = {
    username: '',
    password: ''
  }

  constructor(private API: ApiserviceService,private route:Router,private storage:StorageService) {
  }

  onLogin() {
    this.API.Login(this.loginData).subscribe((res:any)=>{
      if(res.status) {
        console.log(res);
        this.storage.setItem('UserDetails',JSON.stringify(res));
        this.route.navigateByUrl("/ticket");
      } else {
        alert(res.message);
      }
    });
  }

}