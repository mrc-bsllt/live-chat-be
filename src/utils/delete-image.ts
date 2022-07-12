import fs from 'fs'
import path from 'path'

export default (imagePath: string) => {
  const deletePath = path.join(__dirname, '../..', imagePath)
  fs.unlink(deletePath, (error) => {
    if(error) {
      throw(error)
    }
  })
} 