import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public TostService: BehaviorSubject<{
    title: string,
    message: string,
    tostType: string
  }> = new BehaviorSubject({ title: '', message: '', tostType: '' });
  constructor() {

  }

  private showTostMessage(message: {
    title: string,
    message: string,
    tostType: string
  }) {
    this.TostService.next(message);
  }

  showErrorMessage(message: any) {
    this.showTostMessage({
      tostType: 'Error',
      title: 'Error',
      message: message
    });
  }

  public showSuccessMessage(message: string) {
    this.showTostMessage({
      tostType: 'Success',
      title: 'Success',
      message: message
    });
  }
}
