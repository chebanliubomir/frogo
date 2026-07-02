import path from 'path';
import fs from 'fs'

import { Injectable } from '@nestjs/common';
import admZip from 'adm-zip';

@Injectable()
export class ExtractionService {
  async extractionImagesFromPPTX(file: Express.Multer.File, postId: number) {
    if (!file || !file.path) {
      console.error("Ошибка: Путь к файлу на диске отсутствует. Проверьте настройки Multer.");
      return;
    }

    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.wdp', '.tiff'];
    const outPath = path.join(__dirname, '..', '..', 'uploads', 'images');

    if (!fs.existsSync(outPath)) {
      fs.mkdirSync(outPath, { recursive: true });
    }

    try {
      const zip = new admZip(file.path);
      const zipEntries = zip.getEntries();

      let savedCount = 0;

      zipEntries.forEach(zipEntry => {
        if (zipEntry.isDirectory) return;

        const ext = path.extname(zipEntry.entryName).toLowerCase();
        const isImage = validExtensions.includes(ext);
        const isMediaFolder = zipEntry.entryName.includes('media/');

        if (isImage && isMediaFolder) {
          const baseName = path.basename(zipEntry.entryName);
          const uniqueFileName = `${postId}_${baseName}`;

          const outPath = path.join(process.cwd(), 'uploads', 'images');

          if (!fs.existsSync(outPath)) {
            fs.mkdirSync(outPath, { recursive: true });
          }

          const fullOutPath = path.join(outPath, uniqueFileName);

          const fileBuffer = zipEntry.getData();
          fs.writeFileSync(fullOutPath, fileBuffer);
          console.log(`ФИЗИЧЕСКИЙ ПУТЬ: ${fullOutPath}`);
          savedCount++;
        }
      });

      console.log(`Всего сохранено картинок для поста ${postId}: ${savedCount}`);
      return savedCount;

    } catch (error) {
      console.error("Критическая ошибка при чтении PPTX архива:", error);
    }
  }

}
