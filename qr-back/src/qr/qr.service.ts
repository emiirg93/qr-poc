import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
  async generateQRCode(
    baseUrl: string,
    queryParams: { key: string; value: string }[],
  ): Promise<string> {
    if (!baseUrl) {
      throw new Error('Base URL is required');
    }

    const queryString = queryParams
      .filter((param) => param.key && param.value)
      .map(
        (param) =>
          `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`,
      )
      .join('&');

    const fullUrl = `${baseUrl}?${queryString}`;

    try {
      return await QRCode.toDataURL(fullUrl); // Genera el QR en base64
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }
}
