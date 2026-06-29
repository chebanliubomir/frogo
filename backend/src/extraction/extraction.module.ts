import { Module } from '@nestjs/common';

import { ExtractionService } from './extraction.service';

@Module({
    providers: [ExtractionService],
})
export class ExtractionModule {}
