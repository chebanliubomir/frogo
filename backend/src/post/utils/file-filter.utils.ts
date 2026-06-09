import { HttpException, HttpStatus } from "@nestjs/common";

export const imageFileFilter = (req, file, callback) => {
  const regExpFormatFile = /\.(jpg|jpeg|png|gif)$/

  if (!file.originalname.match(regExpFormatFile)) {
    return callback(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST,), false)
  }
  callback(null, true)
}
