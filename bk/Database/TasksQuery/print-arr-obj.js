const getTaskCompresFiles_ARR = async (file) => {
  const currentDirectory = process.cwd();
  const {type, name, task_id} = file
  const fullFile = []
  file_path = `${currentDirectory}/uploads/${task_id}/compres_${name}`;
  file_content = await readFileAsync(file_path, "base64");

  fullFile.push({
    type: type,
    name: name,
    content: file_content
  })

  return fullFile
};

const getTaskCompresFiles_OBJ = async (file) => {
  const currentDirectory = process.cwd();
  const {type, name, task_id} = file
  const fullFile = {}
  file_path = `${currentDirectory}/uploads/${task_id}/compres_${name}`;
  file_content = await readFileAsync(file_path, "base64");

  fullFile.type = type;
  fullFile.name = name;
  fullFile.content = file_content;

  return fullFile
};