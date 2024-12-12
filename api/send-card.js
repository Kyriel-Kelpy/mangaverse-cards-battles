// api/send-card.js

const twilio = require('twilio');

const accountSid = 'AC11ee726eb1532ae76beeb48a341e176c';  // Ton SID Twilio
const authToken = '2eb515ba6c76619c200139609db66422';  // Ton Auth Token Twilio
const client = new twilio(accountSid, authToken);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { number, message } = req.body;

    try {
      const response = await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886',  // Ton numéro WhatsApp Twilio
        to: `whatsapp:${number}`
      });

      return res.status(200).json({ success: true, sid: response.sid });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }
};
