import { diskStorage } from "multer"
import uuid from 'uuid'

const generateUniqueFileName = (req, file, callback) => {
  const uniqueCode = uuid.v4()
  const originalname = file.originalname.split('.')[0]

  callback(null, [uniqueCode, originalname].join('-'))
}

export const presentationStorage = diskStorage({
  destination: './uploads',
  filename: generateUniqueFileName
})
