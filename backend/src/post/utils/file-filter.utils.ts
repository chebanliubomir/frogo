import { HttpException, HttpStatus } from "@nestjs/common";

export const presentationFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(ppt|pptx)$/)) {
    return callback(new HttpException('Only file in presentation format (ppt, pptx).', HttpStatus.BAD_REQUEST,), false);
  }
  callback(null, true);
};
