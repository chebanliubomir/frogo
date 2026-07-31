import { diskStorage } from 'multer'
import uuid from 'uuid'

// export const fileFilter = (req, file, callback) => {
//   // TODO: Create a filter for presentation only
//   callback(null, true)
// }

const folderName = uuid.v4()

const generateUniqueFileName = (req, file, callback) => {
  const uniqueCode = uuid.v4()
  const originalname = file.originalname.split('.')

  callback(null, 'images' + "-" + ([uniqueCode, originalname[0]].join('-')) + '.' + originalname[1])
}

export const filesStorage = diskStorage({
  destination: `uploads/${folderName}/presentation/`,
  filename: generateUniqueFileName,
})
