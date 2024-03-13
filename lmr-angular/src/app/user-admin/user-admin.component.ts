import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../service/apiservice.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PaginationPipe } from '../shared/pipes/pagination.pipe';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, PaginationPipe],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent {

  formData: any = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    image: ''
  }

  current_page: number = 0;

  constructor(private API: ApiserviceService, private route: Router) { }

  readSuppliers: any[] = [];
  readSuppliersPageSize: number = 8;
  readSuppliersCurrentPage: number = 0;
  changeReadSuppliersPage(pageNumber: number) {
    this.readSuppliersCurrentPage = pageNumber;
  }
  get readSuppliersPages(): number[] {
    const pages = Math.ceil(this.readSuppliers.length / this.readSuppliersPageSize);
    let pagingList: number[] = [];

    for (let i = 0; i < pages; i++) {
      pagingList.push(i);
    }
    return pagingList;
  }

  readUsers: any[] = [];
  readUsersPageSize: number = 8;
  readUsersCurrentPage: number = 0;
  changeReadUsersPage(pageNumber: number) {
    this.readUsersCurrentPage = pageNumber;
  }
  get readUsersPages(): number[] {
    const pages = Math.ceil(this.readUsers.length / this.readUsersPageSize);
    let pagingList: number[] = [];

    for (let i = 0; i < pages; i++) {
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
    this.formData.name = "";
    this.formData.phone = "";
    this.formData.email = "";
    this.formData.address = "";
    this.formData.password = "";
    this.formData.image = "";
  }


  editSuppliers(suppliers: any) {
    this.formData.id = suppliers.id;
    this.formData.name = suppliers.name;
    this.formData.phone = suppliers.phone;
    this.formData.email = suppliers.email;
    this.formData.address = suppliers.address;
    this.formData.password = suppliers.password;
    this.formData.image = suppliers.image;
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

  fileName: string = "";
  fileChanged(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
      this.API.uploadThumbnailFile(formData).subscribe((d:any)=>{
        this.formData.image= d.fileName;
      },error=>alert("unable to upload the file. please use .jpeg .png"));

      //const upload$ = this.http.post("/api/thumbnail-upload", formData);
      //upload$.subscribe();
    }
  }

  userfileChanged(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
      this.API.uploadThumbnailFile(formData).subscribe((d:any)=>{
        this.formData.image= d.fileName;
      },error=>alert("unable to upload the file. please use .jpeg .png"));

      //const upload$ = this.http.post("/api/thumbnail-upload", formData);
      //upload$.subscribe();
    }
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

  deleteSuppliers(id: any) {
    if (confirm('Are you sure?')) {
      this.API.deleteSupplier(id).subscribe((res: any) => {
        alert("Suppliers deleted successfully");
        this.refreshList();
      });
    }
  }

  addUsers() {
    this.formData.id = 0;
    this.formData.name = "";
    this.formData.phone = "";
    this.formData.email = "";
    this.formData.address = "";
    this.formData.password = "";
    this.formData.image = "";
  }

  editUsers(users: any) {
    this.formData.id = users.id;
    this.formData.name = users.name;
    this.formData.phone = users.phone;
    this.formData.email = users.email;
    this.formData.address = users.address;
    this.formData.password = users.password;
    this.formData.image = users.image;
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

  deleteUser(id: any) {
    if (confirm('Are you sure?')) {
      this.API.deleteUsers(id).subscribe((res: any) => {
        alert("User deleted successfully");
        this.refreshList();
      });
    }
  }

}
