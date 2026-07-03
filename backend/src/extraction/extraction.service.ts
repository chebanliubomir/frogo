import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtractionService {
  async extractionImagesFromPPTX(file: Express.Multer.File, postId: number) {}
}
