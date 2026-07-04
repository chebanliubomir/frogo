import { Injectable } from '@nestjs/common'
import * as libre from 'libreoffice-convert'
import * as fs from 'fs/promises'
import * as path from 'path'
@Injectable()
export class ExtractionService {

  async extractionImagesFromPPTX(file: Express.Multer.File, postId: number) {

    const fileRead = await fs.readFile(file.path)

    const result = await new Promise<Buffer>((resolve, reject) => {
      libre.convert(fileRead, '.pdf', undefined, (err, done) => {
        if (err) return reject(err)
        resolve(done)
      });
    });

    const uploadDir = path.join(process.cwd(), 'uploads', 'pdf')

    await fs.mkdir(uploadDir, { recursive: true })

    const baseName = path.parse(file.originalname).name
    const fileName = `${baseName}-${Date.now()}.pdf`
    const fullPath = path.join(uploadDir, fileName)

    await fs.writeFile(fullPath, result)
  }
}
