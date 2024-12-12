document.getElementById('whatsapp-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher l'envoi du formulaire

    const numbersInput = document.getElementById('numbers').value;
    const numbers = numbersInput.split(',').map(num => num.trim());

    // Liste des personnages
    const characters = [
        { name: "Naruto", rank: "A", style: "Balanced" },
        { name: "Sasuke", rank: "A", style: "Ranged" },
        { name: "Madara", rank: "S", style: "Balanced" },
        { name: "Goku", rank: "S", style: "Close Combat" },
        { name: "Vegeta", rank: "A", style: "Ranged" },
        { name: "Luffy", rank: "B", style: "Close Combat" },
        { name: "Zoro", rank: "A", style: "Close Combat" },
        { name: "Ichigo", rank: "B", style: "Balanced" }
    ];

    // Fonction pour tirer des cartes aléatoires
    function getRandomCards(numCards) {
        const availableCards = [...characters];
        const selectedCards = [];

        for (let i = 0; i < numCards; i++) {
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            const selectedCard = availableCards.splice(randomIndex, 1)[0];
            selectedCards.push(selectedCard);
        }

        return selectedCards;
    }

    // Envoi des cartes via Twilio
    function sendCards(numbers, cards) {
        const statusDiv = document.getElementById('status');
        numbers.forEach(number => {
            const cardsMessage = cards.map(card => 
                `${card.name} - Rang: ${card.rank}, Style: ${card.style}`
            ).join('\n');

            // Appeler Twilio API pour envoyer le message WhatsApp
            fetch('/api/send-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: number,
                    message: `Voici vos cartes de Mangaverse Chara Battles :\n\n${cardsMessage}`
                })
            })
            .then(response => response.json())
            .then(data => {
                statusDiv.innerHTML += `<p>Carte envoyée à ${number} avec succès !</p>`;
            })
            .catch(error => {
                statusDiv.innerHTML += `<p>Erreur lors de l'envoi à ${number}.</p>`;
            });
        });
    }

    // Distribuer les cartes et envoyer
    const playerCards = getRandomCards(4); // Tirer 4 cartes pour chaque joueur
    sendCards(numbers, playerCards);
});
