import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { QrService } from './qr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, InputTextModule, CardModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'qr-front';
  fb = inject(FormBuilder);
  form = this.fb.group({
    baseUrl: [null, Validators.required],
    queryParams: this.fb.array([]),
  });

  qrSvc = inject(QrService);
  qrCode = signal<string | null>(null);

  get queryParamsForm(): FormArray {
    return this.form.get('queryParams') as FormArray;
  }

  get queryParamGroups(): FormGroup[] {
    return this.queryParamsForm.controls as FormGroup[];
  }

  addQueryParam() {
    this.queryParamsForm.push(this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    }))
  }

  previewUrl(): string {
    const baseUrl = this.form.get('baseUrl')?.value;

    const queryString = this.queryParamGroups
      .filter((param) => param.value.key && param.value.value)
      .map(
        (param) =>
          `${encodeURIComponent(param.value.key)}=${encodeURIComponent(param.value.value)}`,
      )
      .join('&');

    return  baseUrl ? `${baseUrl}?${queryString}` : '';
  }

  generate(){
    this.qrSvc.generateQr(this.form.getRawValue()).subscribe((res:any) => {
      this.qrCode.set(res.qrCode);
    });
  }
}
