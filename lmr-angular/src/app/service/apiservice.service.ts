import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, map, takeLast, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  upoadThumbnail(formData: FormData) {
    return this.http.post(`${this.baseUrl}/api/thumbnail-upload`, formData);
  }

  //baseUrl = "https://sketchwebs.online/construction/LMR/api";
  baseUrl = "http://localhost:8085";
  
  constructor(private http: HttpClient) { }

  Login(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/login/`, data);
  }

  UserLogin(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/userlogin/`, data);
  }

  SupplierLogin(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/supplierlogin/`, data);
  }

  getAllSuppliers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/supplier/`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/user/`);
  }

  createNewSupplier(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/supplier/add/`, data);
  }

  createNewUser(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/add/`, data);
  }

  updateSupplier(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/supplier/update/${data.id}`, data);
  }

  updateUsers(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/update/${data.id}`, data);
  }

  deleteSupplier(data:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/supplier/delete/${data}`, data);
  }

  deleteUsers(data:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/user/delete/${data}`, data);
  }

  getAllTickets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ticket/`);
  }

  createNewTicket(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/ticket/add/`, data);
  }

  updateTicket(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/ticket/update/${data.id}`, data);
  }

  deleteTicket(data:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/ticket/delete/${data}`, data);
  }


}
