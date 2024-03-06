import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { UserComponent } from './user/user.component';
import { SupplierLoginComponent } from './supplier-login/supplier-login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authSuppliersGuard } from './shared/guards/auth-suppliers.guard';
import { authUsersGuard } from './shared/guards/auth-users.guard';
import { authAdminGuard } from './shared/guards/auth-admin.guard';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { AddticketComponent } from './addticket/addticket.component';


export const routes: Routes = [
    { 'path': '', title: 'Admin Login', component: AdminLoginComponent },
    { 'path': 'admin', title: 'Admin Login', component: AdminLoginComponent },
    { 'path': 'users', title: 'User Login', component: LoginComponent },
    { 'path': 'supplier', title: 'Supplier Login', component: SupplierLoginComponent },
    { 'path': '404', title: 'Page Not Found', component: PageNotFoundComponent },
    {
        'path': 'ticket', component: TicketComponent,
        children: [
            { path: 'addticket', title: 'Add Ticket', component: AddticketComponent },
            { path: 'useradmin', title: 'User Admin', component: UserAdminComponent },
            { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
            { path: 'user', title: 'User', component: UserComponent },
            { path: 'message', title: 'Message', component: MessageComponent },        
            { path: '', redirectTo:'dashboard', pathMatch:'full' }
            
        ]
    },
    { 'path': '**', redirectTo: '404' }
];
