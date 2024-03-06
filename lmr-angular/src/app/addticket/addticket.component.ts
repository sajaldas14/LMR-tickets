import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../service/apiservice.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PaginationPipe } from '../shared/pipes/pagination.pipe';

@Component({
  selector: 'app-addticket',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, PaginationPipe],
  templateUrl: './addticket.component.html',
  styleUrl: './addticket.component.css'
})
export class AddticketComponent {

  formData: any = {
    id: 0,
    commande: '',
    description: ''
  }

  current_page: number = 0;

  constructor(private API: ApiserviceService, private route: Router) { }

  readTickets: any[] = [];
  readSuppliersPageSize: number = 8;
  readSuppliersCurrentPage:number=0;
  changeReadSuppliersPage(pageNumber:number){
    this.readSuppliersCurrentPage = pageNumber;
  }
  get readSuppliersPages():number[]{
    const pages = Math.ceil(this.readTickets.length/this.readSuppliersPageSize);
    let pagingList:number[] = [];

    for(let i =0;i<pages;i++){
      pagingList.push(i);
    }
    return pagingList;
  }

  ngOnInit(): void {
    this.refreshList();
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
  }


  editTicket(suppliers: any) {
    this.formData.id = suppliers.id;
    this.formData.name = suppliers.commande;
    this.formData.phone = suppliers.description;
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

  deleteTicket(id:any){
    if(confirm('Are you sure?')){
        this.API.deleteTicket(id).subscribe((res: any) => {
        alert("Ticket deleted successfully");
        this.refreshList();
      });
    }
  }

}
