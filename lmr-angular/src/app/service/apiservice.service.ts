import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, map, takeLast, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  //baseUrl = "https://sketchwebs.online/construction/LMR/api";
  baseUrl = "http://localhost:3000/construction/LMR/api";

  constructor(private http: HttpClient, private storage: StorageService) { }

  setUserHeaders(): import("@angular/common/http").HttpHeaders | { [header: string]: string | string[]; } | undefined {
    var user = this.storage.getItem('UserDetails') ?? "";
    try {
      user = JSON.parse(user);
    } catch (err) { }

    if (user) {
      return {
        'x-app-user': encodeURIComponent(JSON.stringify(user))
      }
    }
    return {}
  }

  getHeaders() {
    return {
      headers: this.setUserHeaders()
    }
  }

  uploadThumbnailFile(formData: FormData) {
    return this.http.post(`${this.baseUrl}/api/file/single`, formData)
  }

  Login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/login/`, data);
  }

  UserLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/userlogin/`, data);
  }

  SupplierLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/supplierlogin/`, data);
  }

  getAllSuppliers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/supplier/`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/user/`);
  }

  createNewSupplier(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/supplier/add/`, data);
  }

  createNewUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/add/`, data);
  }

  updateSupplier(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/supplier/update/${data.id}`, data);
  }

  updateUsers(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/update/${data.id}`, data);
  }

  deleteSupplier(data: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/supplier/delete/${data}`, data);
  }

  deleteUsers(data: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/user/delete/${data}`, data);
  }

  getAllTickets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ticket/`, this.getHeaders());
  }

  createNewTicket(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/ticket/add/`, data);
  }

  updateTicket(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/ticket/update/${data.id}`, data);
  }

  deleteTicket(data: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/ticket/delete/${data}`, data);
  }



  getConversatations(s: string, r: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/messages/conversation/${s}/${r}`);
  }

  sendMessage(s: string, data: { reciver: string; message_data: string; attachment: string; }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/messages/send/${s}`, data, this.getHeaders());
  }




}


