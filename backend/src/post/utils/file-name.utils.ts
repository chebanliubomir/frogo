import { extname } from "path";
import uuid from 'uuid';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = uuid.v4()

  callback(null, `${name}${randomName}${fileExtName}`);
};
