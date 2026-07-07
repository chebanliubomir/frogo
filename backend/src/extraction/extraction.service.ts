import * as fs from 'fs/promises'
import * as path from 'path'

import { Injectable } from '@nestjs/common'
import * as libre from 'libreoffice-convert'
@Injectable()
export class ExtractionService {

  async extractionImagesFromPPTX(file: Express.Multer.File, postId: number) {

    const fileRead = await fs.readFile(file.path)

    const result = await new Promise<Buffer>((resolve, reject) => {
      libre.convert(fileRead, '.pdf', undefined, (err, done) => {
        if (err) return reject(err)
        resolve(done)
      })
    })

    const uploadDir = path.join(process.cwd(), 'uploads', 'pdf')

    await fs.mkdir(uploadDir, { recursive: true })

    const fileName = path.parse(file.originalname).name + postId

    await fs.writeFile(fileName, result)
  }
}
