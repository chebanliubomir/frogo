import path from 'path';

import { Injectable } from '@nestjs/common';
import admZip from 'adm-zip';

@Injectable()
export class ExtractionService {
  extractionImagesFromPPTX(file: Express.Multer.File) {
    const outPath = path.join(__dirname, '..', '..', 'uploads', file.filename)

    console.log(outPath)

    const zip = new admZip(file.buffer)
    const zipEntries = zip.getEntries()
    console.log(zipEntries)

  }
}
