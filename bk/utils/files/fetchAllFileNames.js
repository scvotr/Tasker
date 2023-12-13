const path = require('path');

const fetchAllFileNames = (dataset, folder_name) => {
  const currentDirectory = process.cwd();
  const result = []

  for(let i = 0; i < dataset.length; i++) {
    const current_data = dataset[i]

    if(current_data.file_names) {
      current_data.file_names = current_data.file_names.split('|')
      current_data.old_files = []

      for(let j = 0; j < current_data.file_names.length; j++ ) {
        let file_path
        let file_content

        const file_ext = path.extname(current_data.file_names[j])
        const file_name = current_data.file_names[j]

        current_data.old_files.push({
          type: file_ext,
          name: file_name,
        })
      }
    } else {
      current_data.file_names = []
      current_data.files = []
    }
    result.push(current_data)
  }
  return result
}

module.exports = {
  fetchAllFileNames,
}