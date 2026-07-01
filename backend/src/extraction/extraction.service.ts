import path from 'path';
import fs from 'fs'

import { Injectable } from '@nestjs/common';
import admZip from 'adm-zip';

@Injectable()
export class ExtractionService {
  extractionImagesFromPPTX(file: Express.Multer.File, postId: number) {
    const validExtensions = ['.jpg', '.jpeg', '.png']

    const outPath = path.join(__dirname, '..', '..', 'uploads', 'images')

    if (!fs.existsSync(outPath)) {
      fs.mkdirSync(outPath, { recursive: true });
    }

    const zip = new admZip(file.buffer)
    const zipEntries = zip.getEntries()

    zipEntries.forEach(zipEntry => {
      if (zipEntry.isDirectory) return
      const ext = path.extname(zipEntry.entryName).toLowerCase()

      if (validExtensions.includes(ext)) {
        zip.extractEntryTo(zipEntry, outPath, false, true)
      }

    })
  }

}
