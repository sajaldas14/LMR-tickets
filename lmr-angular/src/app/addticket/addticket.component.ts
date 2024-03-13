import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../service/apiservice.service';
import { Router } from '@angular/router';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { PaginationPipe } from '../shared/pipes/pagination.pipe';

@Component({
  selector: 'app-addticket',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass, PaginationPipe, AsyncPipe],
  templateUrl: './addticket.component.html',
  styleUrl: './addticket.component.css'
})
export class AddticketComponent {

  formData: any = {
    id: 0,
    commande: '',
    description: '',
    user: '',
    sup: '',
    status: ''
  }

  current_page: number = 0;
  suplierList: any[] = [];
  userList: any[] = [];


  constructor(private API: ApiserviceService, private route: Router) {
  }

  readTickets: any[] = [];
  readSuppliersPageSize: number = 10;
  readSuppliersCurrentPage: number = 0;
  changeReadSuppliersPage(pageNumber: number) {
    this.readSuppliersCurrentPage = pageNumber;
  }
  get readSuppliersPages(): number[] {
    const pages = Math.ceil(this.readTickets.length / this.readSuppliersPageSize);
    let pagingList: number[] = [];

    for (let i = 0; i < pages; i++) {
      pagingList.push(i);
    }
    return pagingList;
  }

  ngOnInit(): void {
    this.refreshList();
    this.API.getAllSuppliers().subscribe(d => { this.suplierList = d.data });
    this.API.getAllUsers().subscribe(d => { this.userList = d.data });
  }

  refreshList() {
    this.API.getAllTickets().subscribe((res: { data: any; }) => {
      this.readTickets = res.data;
    });
  }

  addTicket() {
    this.formData.id = 0;
    this.formData.commande = "";
    this.formData.description = "";
    this.formData.user = "";
    this.formData.sup = "";
    this.formData.status = "";
  }


  editTicket(suppliers: any) {
    this.formData.id = suppliers.ticket_id;
    this.formData.commande = suppliers.ref_order;
    this.formData.description = suppliers.description;
    this.formData.user = suppliers.assigned;
    this.formData.sup = suppliers.supplier;
    this.formData.status = suppliers.status;
  }

  onSaveTicket() {
    this.API.createNewTicket(this.formData).subscribe((res: any) => {
      if (res.status) {
        alert("Ticket created successfully");
        this.refreshList();
      } else {
        alert(res.message);
      }
    });
  }

  updateTicket() {
    this.API.updateTicket(this.formData).subscribe((res: any) => {
      if (res.status) {
        alert("Ticket updated successfully");
        this.refreshList();
      } else {
        alert(res.message);
      }
    });
  }

  deleteTicket(id: any) {
    if (confirm('Are you sure?')) {
      this.API.deleteTicket(id).subscribe((res: any) => {
        alert("Ticket deleted successfully");
        this.refreshList();
      });
    }
  }

}
