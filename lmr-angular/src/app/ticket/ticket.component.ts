import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-ticket',
    standalone: true,
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.css',
    imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet, DashboardComponent]
})
export class TicketComponent {

}
