import "./ImageBlock.css";
import pdfIco from "../../../../image/icon/pdf-icon.png";
// При открытии мен нужно запросить файлы с сервера 

export const ImageBlock = ({ files, actionType, takeExistIndex, takeAddedIndex }) => {
  console.log('ddd',files)
  return (
    <>
      {actionType === "tableViewOnly" ? (
        <>
          {files && files.map((file, index) => (
            <div key={index} className="file-preview-container">
              {file.type === ".pdf" ? (
                <div className="pdf__container" onClick={() => takeExistIndex(index)}>
                  <img key={index} src={pdfIco} alt="PDF Icon" width={50} />
                  {file.name}
                </div>
              ) : (
                <>
                  <img
                    className="file-previews"
                    key={index}
                    src={`data:${file.type};base64,${file.content}`}
                    loading="lazy"
                    alt="File Preview"
                    width={75}
                    height={75}
                    onClick={() => takeExistIndex(index)}
                    title="Нажмите, чтобы удалить"
                  />
                </>
              )}
            </div>
          ))}
        </>
      ) : actionType === "addNewTaskFiles" ? (
        <div className="container-img">
          {files && files.filePreviews && files.filePreviews.map((preview, index) => (
            <div key={index}>
              {preview.startsWith("data:application/pdf") ? (
                <div className="pdf__container" onClick={() => takeAddedIndex(index)}>
                  <img key={index} src={pdfIco} alt="PDF Icon" width={50} />
                  {files.files[index].name}
                </div>
              ) : (
                <>
                  <img
                    className="file-previews"
                    key={index}
                    src={preview}
                    alt="File Preview"
                    width={75}
                    height={75}
                    onClick={() => takeAddedIndex(index)}
                    title="Нажмите, чтобы удалить"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>--</p>
      )}
    </>
  );
};