import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000'

  constructor() { }

  generateQr(body:any){
    return this.http.post(`${this.apiUrl}/qr/generate`,body);
  }
}
