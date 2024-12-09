import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  constructor() { }

  generateQr(body:any){
    return this.http.post(`${this.apiUrl}/qr/generate`,body);
  }
}
