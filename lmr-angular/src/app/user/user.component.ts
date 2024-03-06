import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../service/apiservice.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PaginationPipe } from '../shared/pipes/pagination.pipe';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, PaginationPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  formData: any = {
    id: 0,
    fname: '',
    lname: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  }

  current_page: number = 0;

  constructor(private API: ApiserviceService, private route: Router) { }

  readSuppliers: any[] = [];
  readSuppliersPageSize: number = 8;
  readSuppliersCurrentPage:number=0;
  changeReadSuppliersPage(pageNumber:number){
    this.readSuppliersCurrentPage = pageNumber;
  }
  get readSuppliersPages():number[]{
    const pages = Math.ceil(this.readSuppliers.length/this.readSuppliersPageSize);
    let pagingList:number[] = [];

    for(let i =0;i<pages;i++){
      pagingList.push(i);
    }
    return pagingList;
  }
  
  readUsers: any[] = [];
  readUsersPageSize: number = 8;
  readUsersCurrentPage:number=0;
  changeReadUsersPage(pageNumber:number){
    this.readUsersCurrentPage = pageNumber;
  }
  get readUsersPages():number[]{
    const pages = Math.ceil(this.readUsers.length/this.readUsersPageSize);
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
    this.API.getAllSuppliers().subscribe((res: { data: any; }) => {
      this.readSuppliers = res.data;
    });
    this.API.getAllUsers().subscribe((res: { data: any; }) => {
      this.readUsers = res.data;
    });
  }

  addSuppliers() {
    this.formData.id = 0;
    this.formData.fname = "";
    this.formData.lname = "";
    this.formData.phone = "";
    this.formData.email = "";
    this.formData.address = "";
    this.formData.password = "";
  }

  editSuppliers(suppliers: any) {
    this.formData.id = suppliers.id;
    this.formData.fname = suppliers.fname;
    this.formData.lname = suppliers.lname;
    this.formData.phone = suppliers.phone;
    this.formData.email = suppliers.email;
    this.formData.address = suppliers.address;
    this.formData.password = suppliers.password;
  }

  onSaveSuppliers() {
    this.API.createNewSupplier(this.formData).subscribe((res: any) => {
      if (res.status) {
        alert("Suppliers created successfully");        
        this.refreshList();
      } else {
        alert(res.message);
      }
    });
  }

  updateSuppliers() {
    this.API.updateSupplier(this.formData).subscribe((res: any) => {
      if (res.status) {
        alert("Suppliers updated successfully");
        this.refreshList();
      } else {
        alert(res.message);
      }
    });
  }

  addUsers() {
    this.formData.id = 0;
    this.formData.fname = "";
    this.formData.lname = "";
    this.formData.phone = "";
    this.formData.email = "";
    this.formData.address = "";
    this.formData.password = "";
  }

  editUsers(users: any) {
    this.formData.id = users.id;
    this.formData.fname = users.fname;
    this.formData.lname = users.lname;
    this.formData.phone = users.phone;
    this.formData.email = users.email;
    this.formData.address = users.address;
    this.formData.password = users.password;
  }

  onSaveUser() {
    this.API.createNewUser(this.formData).subscribe((res: any) => {
      if (res.status) {
        alert("User created successfully");
        this.refreshList();
      } else {
        alert(res.message);
      }
    });
  }

  updateUser() {
    this.API.updateUsers(this.formData).subscribe((res: any) => {
      if (res.status) {
        alert("User updated successfully");
        this.refreshList();
      } else {
        alert(res.message);
      }
    });
  }

}
