import { Injectable } from '@nestjs/common';
import { extractPptx } from 'pptx-content-extractor';

@Injectable()
export class ExtractorService {
  
  async extract(file) {
    const result = await extractPptx(file)
    console.log(result.slides)
    return result.slides
  }

}
