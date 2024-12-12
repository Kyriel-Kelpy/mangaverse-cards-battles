import twilio from 'twilio';

// SID et Auth Token Twilio
const accountSid = 'AC11ee726eb1532ae76beeb48a341e176c'; // Remplace par ton SID Twilio
const authToken = '2eb515ba6c76619c200139609db66422'; // Remplace par ton Auth Token Twilio
const client = new twilio(accountSid, authToken);

module.exports = async (req, res) => {
    // Assurez-vous que la méthode est POST
    if (req.method === 'POST') {
        const { number, message } = req.body;
        console.log('Données reçues:', { number, message });  // Debugging : Affiche les données reçues

        try {
            // Envoi du message via Twilio
            const messageResponse = await client.messages.create({
                body: message,
                from: 'whatsapp:+14155238886',  // Remplace par ton numéro WhatsApp Twilio
                to: `whatsapp:${number}`, // Numéro de téléphone du destinataire
            });

            console.log('Message envoyé avec succès:', messageResponse.sid);  // Debugging : Affiche l'ID du message

            // Répondre avec un succès
            res.status(200).json({ success: true, sid: messageResponse.sid });
        } catch (error) {
            console.error('Erreur Twilio:', error);  // Debugging : Affiche l'erreur Twilio

            // Répondre en cas d'erreur
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        // Si la méthode n'est pas POST, renvoyer une erreur 405
        res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }
};
