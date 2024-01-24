const { testToPDF } = require('../DocsControler'); // Подставьте имя файла, где находится ваш метод

test('testToPDF should generate PDF with watermark', async () => {
  const req = {
    user: {
      payLoad: {
        fields: {
          name: 'John Doe',
          text: 'Sample text'
        }
      },
      id: 123 // Замените на реальный ID пользователя
    }
  };

  const res = {
    // Здесь можно добавить моки для проверки вызовов функций ответа
    send: jest.fn(),
    status: jest.fn()
  };

  await testToPDF(req, res);

  // Напишите здесь утверждения (assertions), чтобы проверить, что файл PDF с водяным знаком был успешно создан или отправлен на фронтенд.
});