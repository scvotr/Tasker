/*
  Функция возвращает превью всех файлов по ID
*/
import { readFileAsync } from "./readFileAsync";

 

export const getThumbnailFiles = async (folder_id, files_names, folder_name) => {
  const currentDirectory = process.cwd();
  const file = []

  for (let i = 0; i < files_names.length; i++) {
    let file_path
    let file_content
    
    const file = files_names[i]
    // const { type, name } = file

    file_path = folder_name ? `${currentDirectory}/uploads/${folder_name}/${folder_id}/thumbnail_${file.name}`
                            : `${currentDirectory}/uploads/${folder_id}/thumbnail_${file.name}`

    try {
      file_content = await readFileAsync(file_path, 'base64')
    } catch (error) {
      
    }                        
  }
}