const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const mammoth = require('mammoth');
const fs = require('fs').promises; // добавлено для чтения файлов
const path = require('path');

const currentDirectory = process.cwd();
const pathToFonts = path.join(currentDirectory, 'fonts/Time/TIMES.TTF')

const convertDocxToPdf = async (docxContent, templateFullPath) => {
  try {
    // Использование Mammoth для конвертации .docx в HTML
    const { value } = await mammoth.extractRawText({ path: templateFullPath, encoding: 'utf8' });
    const htmlContent = value;
    const sanitizedHtmlContent = htmlContent.replace(/♥/g, '\u2665');
    // Создание нового PDF документа
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    // Загрузка пользовательского шрифта с помощью fontkit
    const fontBuffer = await fs.readFile(pathToFonts);
    // Встраиваем шрифт в PDF документ
    const openTimesFont = await pdfDoc.embedFont(fontBuffer);
    
    const page = pdfDoc.addPage([595.276, 841.890]); // Размер страницы A4
    const { width, height } = page.getSize();
    const fontSize = 12;

    // Используйте встраившийся пользовательский шрифт при отрисовке текста
    page.drawText(sanitizedHtmlContent, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: openTimesFont,
      color: rgb(0, 0.53, 0.71),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`convertDocxToPdf failed: ${error.message}`);
  }
};

const addWatermark = async (pdfBytes, watermarkText) => {
  console.log('addWatermark-pdfBytes', pdfBytes)
  try {
    // Загружаем PDF-документ
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);
    // Встраиваем шрифт в документ
    const fontBuffer = await fs.readFile(path.resolve(pathToFonts)); //const fontBuffer = await fs.readFile(pathToFonts);
    const openTimesFont = await pdfDoc.embedFont(fontBuffer);
    // Получаем страницы документа
    const pages = pdfDoc.getPages();
    // Проходим по всем страницам и добавляем водяной знак
    pages.forEach((page) => {
      const { width, height } = page.getSize(); console.log(width, height)
      const textWidth = openTimesFont.widthOfTextAtSize(watermarkText, 50);
      const x = (width - textWidth) / 2;
      const y = height / 2;
      page.drawText(watermarkText, { x, y, font: openTimesFont, size: 50, color: rgb(0.7, 0.7, 0.7) })
    })
    const pdfBytesW = await pdfDoc.save();
    return pdfBytesW;
  } catch (error) {
    // Обрабатываем ошибки и выбрасываем исключение
    throw new Error(`addWatermark failed: ${error.message}`);   
  }
};


module.exports = {
  convertDocxToPdf,
  addWatermark,
};

  // const watermarkedPdfBytes = await pdfDoc.save();
  // return { originalPdfBytes: pdfBytes, watermarkedPdfBytes };