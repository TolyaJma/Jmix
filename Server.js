const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

// Инициализация Express
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Инициализация OpenAI API с вашим API-ключом
const openai = new OpenAI({
  apiKey: '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', // Замените на ваш API-ключ
});

// Обработка POST-запросов
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: gptResponse.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error contacting OpenAI' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
