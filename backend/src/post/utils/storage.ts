import { diskStorage } from 'multer'
import uuid from 'uuid'

const generateUniqueFileName = (req, file, callback) => {
  const uniqueCode = uuid.v4()
  const originalname = file.originalname.split('.')

  callback(null, ([uniqueCode, originalname[0]].join('-')) + '.' + originalname[1])
}

export const presentationStorage = diskStorage({
  destination: './uploads',
  filename: generateUniqueFileName
})
