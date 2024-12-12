const twilio = require('twilio');

// SID et Auth Token Twilio
const accountSid = 'AC11ee726eb1532ae76beeb48a341e176c';
const authToken = '2eb515ba6c76619c200139609db66422';
const client = new twilio(accountSid, authToken);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { number, message } = req.body;
        console.log('Données reçues:', { number, message });  // Debugging

        try {
            const messageResponse = await client.messages.create({
                body: message,
                from: 'whatsapp:+14155238886',  // Ton numéro WhatsApp Twilio
                to: `whatsapp:${number}`,
            });

            console.log('Message envoyé avec succès:', messageResponse.sid);  // Debugging

            // Répondre avec un succès
            res.status(200).json({ success: true, sid: messageResponse.sid });
        } catch (error) {
            console.error('Erreur Twilio:', error);  // Debugging
            // Répondre en cas d'erreur
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        // Gérer les méthodes non autorisées
        res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }
};
