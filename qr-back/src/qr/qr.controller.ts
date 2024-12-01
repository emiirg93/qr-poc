import { Body, Controller, Post } from '@nestjs/common';
import { QrService } from './qr.service';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Post('generate')
  async generateQRCode(
    @Body()
    body: {
      baseUrl: string;
      queryParams: { key: string; value: string }[];
    },
  ) {
    try {
      const qrCode = await this.qrService.generateQRCode(
        body.baseUrl,
        body.queryParams,
      );
      return { qrCode };
    } catch (error) {
      return { error: error.message };
    }
  }
}
