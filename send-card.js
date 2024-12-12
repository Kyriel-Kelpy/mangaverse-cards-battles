const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
const app = express();

// Middleware pour lire les requêtes JSON
app.use(bodyParser.json());

// Middleware pour autoriser CORS
app.use(cors());

const accountSid = 'AC11ee726eb1532ae76beeb48a341e176c'; // Ton SID Twilio
const authToken = '2eb515ba6c76619c200139609db66422'; // Ton Auth Token Twilio
const client = new twilio(accountSid, authToken);

// API pour envoyer des cartes
app.post('/send-card', (req, res) => {
    const { number, message } = req.body;
    
    client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // Ton numéro WhatsApp Twilio
        to: `whatsapp:${number}`
    })
    .then(message => res.json({ success: true, sid: message.sid }))
    .catch(error => res.status(500).json({ success: false, error: error.message }));
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});