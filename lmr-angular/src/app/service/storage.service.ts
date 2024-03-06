import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  setItem(key: string, value: string): void {
    this.document.defaultView?.localStorage?.setItem(key, value);
  }
  getItem(key: string): string | null {
    return this.document.defaultView?.localStorage?.getItem(key)??null;
  }
  removeItem(key: string): void {
    this.document.defaultView?.localStorage?.removeItem(key);
  }
}
