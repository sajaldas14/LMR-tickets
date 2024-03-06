import { Component, Inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppComponent } from '../../app.component';
import { StorageService } from '../../service/storage.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,AppComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
[x: string]: any;
isLoggedIn:boolean = false;

constructor(private storage:StorageService, private route:Router) {
  
}

logOff() {
  this.storage.removeItem('UserDetails');
  this.isLoggedIn = false;
  this.route.navigateByUrl("");
}

}
