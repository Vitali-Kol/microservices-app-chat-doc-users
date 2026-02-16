const express = require('express');
const redis = require('redis');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const client = redis.createClient({ url: 'redis://localhost:6380' });
const subscriber = client.duplicate();
async function startSubscriber() {
    await client.connect();
    await subscriber.connect();
    await subscriber.subscribe('chat_channel', (message) => {
        console.log("Server B:  сообщение из PubSub: " + message);
        client.lPush('chat_history', message);
    });
}
startSubscriber();
app.get('/get-history', async (request, response) => {
    const history = await client.lRange('chat_history', 0, 15);
    response.json(history);
});
app.listen(8004, () => {
    console.log("Server B (Subscriber) запущен на порту 8004");
});