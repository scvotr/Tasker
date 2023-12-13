/*
  Функция возвращает превью всех файлов по ID
*/
const {readFileAsync} = require('./readFileAsync')

const getThumbnailFiles = async (folder_id, postPayload, folder_name) => {
  const currentDirectory = process.cwd()
  const filesThumbnailContent = []

  for (let i = 0; i < postPayload.old_files.length; i++) {
    let file_path
    let file_content
    const file = postPayload.old_files[i]
    file_path = folder_name ? `${currentDirectory}/uploads/${folder_name}/${folder_id}/thumbnail_${file.name}`
                            : `${currentDirectory}/uploads/${folder_id}/thumbnail_${file.name}`
    try {
      file_content = await readFileAsync(file_path)
    } catch (error) {
      file_path = `${currentDirectory}/uploads/default/404.jpg`
      file_content = await readFileAsync(file_path)
    }
    filesThumbnailContent.push({
      type: file.type,
      name: file.name,
      content: file_content,
    })                     
  }
  return filesThumbnailContent
}

module.exports = {
  getThumbnailFiles,
}