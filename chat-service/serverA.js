const express = require('express');
const redis = require('redis');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const publisher = redis.createClient({ url: 'redis://localhost:6380' });
publisher.connect();
app.post('/publish-message', async (request, response) => {
    const userName = request.body.userName;
    const userMessage = request.body.userMessage;
    const fullMessage = userName + ": " + userMessage;
    await publisher.publish('chat_channel', fullMessage);
    console.log("Server A: Сообщение опубликовано в канал");
    response.json({ status: "опубликовано" });
});
app.listen(8003, () => {
    console.log("Server A (Publisher) запущен на порту 8003");
});