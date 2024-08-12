import { Injectable } from '@nestjs/common';
import { VietQR } from 'vietqr';

const vietQR = new VietQR({
  clientID: 'e32a70a5-3e34-43b6-8a93-372e3a8dc4e3',
  apiKey: '6d1b178c-8a60-47a1-821b-0e1c69417007',
});
@Injectable()
export class VietqrService {
  constructor() {}
  async generateQrCode(req: any, res: any) {
    const { bank, accountName, accountNumber, amount, memo } = req.body;
    try {
      const qrCode = await vietQR.genQRCodeBase64({
        bank,
        accountName,
        accountNumber,
        amount,
        memo,
      });
      res.json({ qrCode: qrCode.data });
    } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).send(`Error generating QR code: ${error.message}`);
    }
  }
  async getBank(res: any) {
    try {
      const banks = await vietQR.getBanks();
      res.json(banks);
    } catch (error) {
      res.status(500).send('Error fetching banks');
    }
  }

}
